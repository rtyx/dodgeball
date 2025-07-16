# 🏐 Dodgeball

A simulation of a strategic version of the children's game *Dodgeball*, where players pass the ball in precise compass directions until the game ends.

---

## 📘 Problem Description

Kids are playing a game called **Dodgeball**. The game is played on a large field, with each player standing at a unique position defined by integer coordinates.

- The game begins with one player receiving a ball from one of the **eight compass directions**:  
  `N`, `NE`, `E`, `SE`, `S`, `SW`, `W`, `NW` (listed clockwise).
  
- Upon receiving the ball, a player **rotates clockwise in 45° increments**, starting **from the next direction** after the one they received the ball from.

- The first player in a visible direction is passed the ball. The thrower **leaves the field**.

- If multiple players are in the same direction, the ball is passed to the **nearest** one.

- The game ends when the current player has **no valid direction** to throw the ball to.

---

## 🎯 Objective

For each test case:

- Determine how many **throws** occur before the game ends (the initial pass does **not** count).
- Determine which **player was the last to receive** the ball.

---

## 🧾 Input Format

- The first line contains the number of test cases, `T` (1 ≤ T ≤ 100).

- For each test case:
  - An integer `N` (2 ≤ N ≤ 1000): the number of players.
  - Next `N` lines each contain two integers `Xp` and `Yp` (−10⁵ ≤ Xp, Yp ≤ 10⁵): coordinates of the `p`-th player.
  - A line with string `D`: the direction (`N`, `NE`, `E`, `SE`, `S`, `SW`, `W`, `NW`) from which the first player receives the ball.
  - An integer `S` (1 ≤ S ≤ N): index (1-based) of the starting player.

---

## 📤 Output Format

For each test case, output **one line** with two integers:

- The **number of throws** made (excluding the first reception),
- The **index of the last player** who received the ball.

---

## 📎 Example

### ✅ Input
```

8
-10 -10
-10 10
0 -10
0 10
10 -10
10 10
-9 -10
-9 0
NW
5

```

### 💡 Output
```

4 5

```

> In this test case, the ball travels between players:  
> `5 → 6 → 1 → 7 → 8`.  
> Total of **4 throws**, with **player 5** ending up last.

---

## 🧠 Notes

- The vector `(1, 1)` represents direction **NE**.
- Player indices are **1-based**.
- Once a player throws the ball, they are **removed from the field** and are no longer considered in the rotation logic.
