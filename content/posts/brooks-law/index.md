---
title: Brook's Law
publishDate: 2019-05-29T00:00:00Z
---

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.js"></script>

### Defining Brook's Law
Frederick P. Brooks Jr.'s _The Mythical Man-Month_ [^mmm] introduced the concept of Brook's Law:

[^mmm]: I'm reading from the 20th anniversary addition, ISBN 0-201-83595-9, published in 1995.

> Adding manpower to a late software project makes it later.

Today, this is has become a cliché in software engineering. Projects slip, the first solution is to add more people – and the first counterpoint is Brook's Law.

This post will approach the topic from a mathematical perspective, by using equations to model real-life behaviors. This is to say, it's a vast oversimplfication. The project presented, can be thought of as a Widget Factory, trying to determine whether to add staff, in order to deliver an order of 100 Widgets sooner than the current staff can. 

<div id="futile-chartContainer"></div>

<form id="futile">
    <fieldset>
        <legend>Baseline vs Additional Staff</legend>
        <div>
            <label for="futile-additionalStaff">Additional staff</label>: <input id="futile-additionalStaff" type="range" name="additionalStaff" min="0" max="10" value="1" step="1"></input>
        </div>
    </fieldset>
    <script type="module">
        import { InputSet, InputProvider } from '/js/state.js';
        import { Project, ChartJsIllustrator } from './modeling.js';

        (new InputSet(InputProvider.manyFromSelector("#futile-additionalStaff"))).dispatchTo((values) => {
            var project = (new Project(values)).withVariance({remainingWork: 100});
            var worstCase = project.withVariance({additionalStaff: 10});
            (new ChartJsIllustrator(document.getElementById("futile-chartContainer"))).draw(project, worstCase);
        });
    </script>
</form>

Counter to intuition, adding someone to the project doesn't result in an immediate increase in the project's velocity. This effect is primarily attributed to unforeseen variables [^interview]:

* repartitioning of responsibilities and work breakdown
* new folks need time to get acquainted to making Widgets
* bringing someone up to speed, temporarily slows down other folks making making Widgets
* more people to communicate with

[^interview]: See https://cs.calvin.edu/courses/cs/262/kvlinden/references/brooksInterview.html

The more familiar the new folks are to the project, the less time will be necessary assimilating them. If we could hand-wave away assimilation costs, then projects and staffing would behave simply:

<div id="zeroAssimilationTime-chartContainer"></div>

<form id="zeroAssimilationTime">
    <fieldset>
        <legend>Zero assimilation time</legend>
        <div>
            <label for="zeroAssimilationTime-additionalStaff">Additional staff</label>: <input id="zeroAssimilationTime-additionalStaff" type="range" name="additionalStaff" min="0" max="10" value="3" step="1"></input>
        </div>
    </fieldset>
    <script type="module">
        import { InputSet, InputProvider } from '/js/state.js';
        import { Project, ChartJsIllustrator } from './modeling.js';

        (new InputSet(InputProvider.manyFromSelector("#zeroAssimilationTime-additionalStaff"))).dispatchTo((values) => {
            var project = (new Project(values)).withVariance({remainingWork: 100, assimilationTime: 0});
            var worstCase = project.withVariance({additionalStaff: 0});
            (new ChartJsIllustrator(document.getElementById("zeroAssimilationTime-chartContainer"))).draw(project, worstCase);
        });
    </script>
</form>

Ignoring assimilation, we get simple behavior: more people means finishing sooner. This is unrealistic, since even the simplest jobs require training. Projects, as a whole, aren't doomed though. Brook's Law says nothing about projects that are on-time.

### A Mathematical Expression
When a project's timeline is substantially longer than assimilation time, the completion date can be accelerated by adding staff. _A Mathematical Expression of Brook's Law_, Stutzke, 1995 [^stutzke], provides equations that model Brook's Law behavior, and offers up four strategies for working around Brook's Law: cut scope, add time, work overtime, add people. In this post, we'll be trying to determine when adding people is an effective strategy. The paper is presents under the following
conditions:

* No serious, unresolved problems, eg. volatile requirements
* Remaining work is enumerated and well understood
* All new people are:
  * Added at the same time
  * Assigned a mentor
  * Mentorship is spread evenly across the team
  * Focused on this project only
  * Willing to accept existing process and structure as-is, eg. no rebuilding the factory
* Communication costs do not grow with the number of people

[^stutzke]: Presented at the Ninth International Forum on COCOMO and Cost Modeling, October 7th 1994

The paper addresses the special case of a project that is well underway, whose schedule needs to be accelerated. Under this model, the optimistic and realistic cases are unified:

<div id="longHorizon-chartContainer"></div>

<form id="longHorizon">
    <fieldset>
        <legend>Long horizon</legend>
        <div>
            <label for="longHorizon-additionalStaff">Additional staff</label>: <input id="longHorizon-additionalStaff" type="range" name="additionalStaff" min="0" max="10" value="10" step="1"></input>
        </div>
    </fieldset>
    <script type="module">
        import { InputSet, InputProvider } from '/js/state.js';
        import { Project, ChartJsIllustrator } from './modeling.js';

        (new InputSet(InputProvider.manyFromSelector("#longHorizon-additionalStaff"))).dispatchTo((values) => {
            var project = (new Project(values)).withVariance({remainingWork: 500, assimilationTime: 20, assimilationEffort: 0.5});
            var worstCase = project.withVariance({additionalStaff: 0});
            (new ChartJsIllustrator(document.getElementById("longHorizon-chartContainer"))).draw(project, worstCase);
        });
    </script>
</form>

Initially, the productivity drops, reflecting effort and time bringing on new staff. After a four week assimilation period, productivity ticks back up, reflecting the gain from additional staff. Assimilation time has been arbitrarily set to four weeks, and assimilation effort (portion of existing staff's time spent onboarding new folks) to 50%. Under these parameters, an inflection point occurs at Day 35, where the best strategy flips from "keep staffing as-is" to "more staff means faster timeline". 

### Application
Mathematical models necessarily ignore the real world's intricate complexities. Applying this information to your own projects will require hedging this project's decisions within it related constraints, eg.:

* Where will the additional staff come from? New hires, other teams? What are the costs induced there?
* What will they do once this project is complete?
* Does it make sense to spend effort through a project, aimed at reducing assimilation time/effort (eg. writing code comments, documenting norms, etc), or can you rely on homogenous knowledge and skill across your staff or industry, to make up for it?

Many questions remain unanswered, depending on each project's individual constraints and environment, but hopefully, these visualizations provide a stronger mental model to intuit from. 
