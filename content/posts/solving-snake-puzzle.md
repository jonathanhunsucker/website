---
title: "Solving Snake Puzzle"
publishDate: 2019-05-07
draft: true
---

The snake puzzle consists of 27 blocks, held together by an elastic string threaded through holes in each of the blocks. Some blocks have a straight hole connecting one side to the opposite. Some blocks have holes connecting one side to an adjacent side, creating a bend. The challenge of the puzzle, is to orient the blocks so that they form a cube, three blocks tall.

#### Finding an approach
After many hours toying around with it, I began to adopt a simple approach:

1. Fold the puzzle one segment at time (a segment being a run of straight-hole blocks)
1. If a segment causes the solved portion of the puzzle to run outside of a 3x3x3 cube, unfold and try again

After many more hours, I realized that my approach could be codified into a program, to simulate the puzzle and find a solution faster than one could by hand.

#### Finding a suitable notation
The puzzle's configuration can be encoded as a list of segment lengths. For example, the puzzle I have on hand, is encoded like so:
```php
new Puzzle([3, 2, 2, 3, 2, 3, 2, 2, 3, 3, 2, 2, 2, 3, 3, 3, 3]);
```
All together, the list sums to 27, so `Puzzle` determines the goal is three-block-tall cube. 

Many notations exist, though some are easier to work with than others. For example, a list of 27 values, one for each block, would also suffice. So might a 3D model of the puzzle. 

#### Defining the solution
My puzzle had 17 segments. With four possible turns available at every segment connection, there are 16<sup>4</sup> = 65,536 possible arrangements, ignoring that a block can't physically occupy the same space. Part of defining the solution is defining what is not the solution. Immediately, a few criteria for non-solutions stand out:

* Incomplete - Not all segments used, the puzzle has one or more segments unaccounted for
* Overflows - Width, length, or height is greater than three
* Overlaps - Physically not possible, turning back on itself, two blocks in same space

```php
$turns_so_far = [];
$unstarted_puzzle = new Solution($puzzle, $turns_so_far)
```

Every solution has to start somewhere. For the chosen notation, a `Solution` also captures in-progress work. It's tightly coupled to `Cube`, which translates `Solution`'s turn-by-turn instructions into a list of discrete three-dimensional positions the blocks occupy. `Cube` also ensures the solution avoids breaking the overlaps and overflows criteria, via its `isValid()` function. The incomplete criteria is enforced via a separate `Solution->isComplete()` function.

#### Scaffolding a search
With a notation and solution space defined, the search begins. Similar to notations, there's many suitable approaches to searching. The first to mind are breadth-first and depth-first. 

#### Hastening the search
TBA

#### Deeper understanding of the puzzle
With an automatic solver in hand, the puzzle can be characterized and understood deeper.

##### How many solutions for this configuration?
TBA

##### How many solvable 3-tall configurations?
Same question as "how many traversals of a 3-tall cube exist?". Begs questions:

* Which traversals are consider the "same"? Does this change the quantity?
* Can we grade configurations on their difficulty?
* How many solvable 2-tall configurations? 4-tall?

TBA

#### Summary
TBA

##### Notes to self while authoring this
* Why didn't I calculate out 16<sup>4</sup> from the beginning? I would have potentially taken a different approach, had I known the solution space was relatively small.
* How much of the solution is invalided by each criteria mentioned? Are their space-minimization worth their computational cost-savings? Is it possible, that adding more criteria, counterintuitively, slows the search down, since every candidate must be be checked, but maybe only a few candidates are invalidated?

All code can be found [here](https://github.com/jonathanhunsucker/cube-puzzle).
