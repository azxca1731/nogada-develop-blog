---
title: Coursera "kotlin for java developers" Module 2 리뷰
date: "2024-06-02T22:02:49.891Z"
layout: post
path: "/kotlin-1/"
category: CourseReview
tags:
  - Kotlin
  - Study
  - Review
---

<span class="text-danger">이 리뷰는 Coursera "kotlin for java developers"을 보고 리뷰하는 포스트입니다.</span>

## 왜 이 강의를 골랐을까?

무언가를 만들었다면 그 이유가 분명하다. 그렇다면 그 이유에 대해서 가장 잘 설명해줄 사람에게 무언가를 배운다면, 이유에 공감하기 쉽고 익히기에 더욱 좋을 것! 이라는 생각을 하였다. 그래서 해당 코스를 수강하기로 하였다. 더불어.... 회사에서 하라고 했다.
이왕 하는 김에 스터디를 하기로 하였고, 예전에 써봤지만, 그래도 내가 필요한 부분만 쏙쏙 빼먹기 위하여 이렇게 블로그로 정리한다!

목차를 정리한 후 필수 부분을 간단하게 정리하고자 한다.

**참고: 영어가 가능한 한국인이면 영어로 듣고, 아니라면 이 강의 자체를 안듣기를 바란다.**

## 목차

- Java에서 Kotlin으로
- 기본사항
- 제어구조
- 확장기능

<!--more-->

---

## Java에서 Kotlin으로

Java언어는 Javac에 의해 Class파일로 변환되고, Class파일은 JVM (자바 인터프리터 + JIT)에 의해 바이트코드로 변환되어 실행된다. 그러니 Kotlin도 Class파일로 만들면 결국 똑같이 실행할 수 있는 것이다. 그렇기에 원론적으로는 JAVA 환경에 편하게 도입할 수 있다.

## 기본사항

### 선언

```kotlin
val greetingClosed:List<String> = listOf("Hello", "Kotlin", "Again")
var greetingOpen = mutableListOf("Hello", "Kotlin", "Again")
```

일반 선언은 다음과 같이 한다.
val로 assign한 변수는 변경 불가이며, mutable이 붙지않은 iterable 또한 변경불가이다.
즉 어떠한 수로 변경하려 해도 greetingClosed는 항상 같다.

밑은 둘다 열어 두었다. list가 추가 수정이 될 수도 있고, 다른 리스트로 변경 또한 가능하다.
가능하면 val을 쓰며 side effect 없는 변경불가능한 객체를 생성하자.

### 함수

```kotlin
fun max(a: Int, b: Int): Int {
 return if (a > b) a else b
}
```

함수는 다음과 같이 선언할 수 있다. 이 아이를 kotlin스럽게 해보자

```kotlin
fun max(a: Int, b: Int): Int {
  if (a > b) a else b
}
```

코틀린은 마지막 줄이 return이다 생략 가능하다.

```kotlin
fun max(a: Int, b: Int): Int = if (a > b) a else b
```

kotlin에 있어서 Try, If, When은 statement가 아닌 expression이다. 할당 가능하다.

```kotlin
fun max(a: Int, b: Int) = if (a > b) a else b
```

코틀린은 return 값을 명시적인 경우에 기록하지 않아도 된다. 이렇게 코틀린스럽게 만들었다.

void는 없으며 Unit이라는 자료형으로 대신한다. 예시를 보자

```kotlin
fun hello(name:String):Unit {
  println("Hello $name")
}
```

위처럼 Unit은 return이 없다. +kotlin에는 template string이 있어 다음과 같이 사용하면 된다.

### Named & default arguments

```kotlin
println(listOf('a', 'b', 'c').joinToString(
 separator = ""
, prefix = "(", postfix = ")"))
```

자바와 다르게 argument에 이름을 포함하여 부를 수 있다. 가독성이 좋아지며, default argument도 있다.

```kotlin
fun displaySeparator(character: Char = '*', size: Int = 10) {
 repeat(size) {
 print(character)
 }
}

displaySeparator('#', 5) // #####
displaySeparator('#') // ##########
displaySeparator() // **********
```

위처럼 사용가능하다.

---

## 제어구조

### 조건문 if & when

위에서 기재했다. 넘기겠다.

### loop

kotlin은 다음과 같은 2가지의 for문을 제공한다.

```kotlin
// for loop

val list = listOf("a", "b", "c")
for (s in list) {
 print(s)
}
/// abc 출력

for (i in 1..9) {
 print(i)
}
// 123456789 출력

for (i in 1 until 10) {
 print(i)
}
// 123456789 출력
```

위가 대표적인 예시며, 자바처럼 i=0부터 시작하는 그러한 방식은 없다.
..문법과 until은 inline 확장함수며, Stream 같은 걸 반환한다. 적당한 iterable을 만들고 싶을 때 쓰자

추가로 index를 원하면 다음과 같이 할 수 있다.

```kotlin
val list = listOf("a", "b", "c")
for ((index, element) in list.withIndex()) {
 println("$index: $element")
}
```

### ‘in’ checks and ranges

in은 두가지로 활용이 가능하다.

```
// loop를 위하여
for (i in 'a'..'z') { … }
// 범위 내에 포함되었는지 아닌지 밑의 결과는 true이다.
c in 'a'..'z'
```

문자열에서 in은 사전과 같다. 그래서 다음과 같다.

```kotlin
println("kotlin" in 'a'..'z') // true 출력
```

---

## 확장 기능

코틀린은 원하는 것을 직접 확장 가능하다. 그것이 이미 정의된 java 라이브러리여도 말이다. 그렇기에 자유도가 높다. 밑은 위에서 설명한 함수이다. 이 함수 또한 확장함수이며 아래와 같이 확장이 가능하다. 직접 자주쓰는 행위는 Util처럼 만들어도 좋을 것 같다.

```kotlin
val list = listOf("a", "b", "c")
for ((index, element) in list.withIndex()) {
 println("$index $element")
}
fun <T> Iterable<T>.withIndex(): List<IndexedValue<T>> { … }
```

다음과 같은 확장 함수도 있다.

```kotlin
infix fun <A, B> A.to(that: B) = Pair(this, that)
"ANSWER".to(42)
"hot" to RED
mapOf(0 to "zero", 1 to "one")
```

to는 Kotlin에서 제공하는 함수이나 다음처럼 확장함수로 개발되었다. 이렇게 다양하게 확장 함수를 쓸 수 있다.
