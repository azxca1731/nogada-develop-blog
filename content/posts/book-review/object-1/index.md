---
title: 오브젝트 6장까지를 읽고
date: "2021-01-30T20:20:49.891Z"
layout: post
path: "/object-1/"
category: BookReview
tags:
  - Object
  - Study
  - Review
---

## 해당 책을 고른 이유

이 책을 고른 이유는 구조에 대한 확신이 필요했다. 그리고 좋은 코드란 무엇인가라는 생각이 들었다.
예전에는 작은 규모의 코드를 읽었고, 이제는 회사의 규모가 크고 복잡한 코드를 읽으니 그만큼 좋은 코드에 대한 생각이 필요했다. 그리고 저번년도에 이 책이 개발자들에게 인기가 있었다는 사실을 기억하기에 이 책을 골라서 좋은 구조, 코드에 대한 확립이 필요했다.

### 오브젝트

해당 책은 객체지향, 이 말을 가장 알맞게 잘 설명한 책이라고 생각한다. 또한 개발자들에게 가장 친숙한 도구인 코드로 설명을 하기에, 실제로 나의 코드, 회사의 코드를 해당 문제에 대입하기에 더 좋았다. 물론 여기서 말한 문제가 정확히 나의 문제라 보긴 어려웠지만 그래도 개념만 있던 것들 보다 좋아 현재까지는 불만 없이 읽고있다. 현재 이 책은 스터디로 진행을 하고 이를 한장 마다 내가 중요하다 생각하는 개념을 옮겨넣는 블로깅이 될 것이다.

---

### 3장

이 장에서 중요한 것은 협력, 책임, 역할이였다. 그리고 그것을 더욱 활용할 수 있게 만들어주는 것이 CRC 카드라 생각한다.

<img style="height: 310px;" src="./crc.png" alt="CRC" />

Candidate를 하나 놓고 이 것의 책임과 협력점을 구한다.
그리고 어떠한 Candidate에게 책임할당을 할지 Information Expert 패턴을 활용해 할당을 한다.

#### Information Expert (정보전문가) 패턴

해당 패턴은 가장 해당 정보에 대해서 잘 알고있는 객체에게 책임을 전가하는 것에 있다.
정보전문가에게 책임을 할당함으로서 상태와 행동을 함께 가지는 자율적인 객체를 만들 가능성이 높아지기 때문이다.

#### 메시지가 객체를, 행동이 상태를 결정한다.

메시지는 객체가 가지는 최소한의 인터페이스를 결정 할 수 있다. 그리고 이 인터페이스를 기반으로 객체가 책임, 역할을 할지 결정이 된다.
그리고 객체의 상태는 이 객체가 행동 중에 어떠한 일을 할지 정하는 것임으로 행동이 상태를 결정 할 수 있다고 볼 수 있다.

## <!--more-->

### 4장

4장은 간단하게 몇가지 키워드로서 정리하겠다.

<img style="height: 310px;" src="./slack.png" alt="slack" />

---

### 5장

공정훈형 블로그 참조

### 6장 - 메시지와 인터페이스

- 디미터 법칙
- 명령-쿼리 분리

#### 디미터 법칙

디미터 법칙은 간단하게 이야기 한다면, "오직 하나의 .(도트)를 사용하라[Metz12]" 라고 이야기 할 수 있다. 만약 타 객체에서 해당 객체의 정보를 가져오고 해당 정보로 다른 정보를 가져온다면 해당 코드는 가져오는 곳의 정보를 너무 많이 안다. 즉 이 말은 변경에 취약한 코드, 구조라고 할 수 있다.

```java
Image Profile = user.getInfo().getImage().getMain();
```

만약 다음과 같은 코드가 있다하면 NPE의 취약점은 당연한 것이다. 하지만 이외에도 해당 코드를 쓰는 쪽은 user라는 객체가 다음과 같이 많은 정보를 가지고 있다는 것을 알고 있다는 것이고 중간에 하나의 객체가 바뀐다 가정하였을 경우 이를 모두 바꿔야하는 단점이 존재하는 것이다. 그래서 디미터 법칙은 도트를 하나만 쓰라고 한다.

하지만 다음과 같은 것은 아니다.

```java
ItemImage hello = ItemImage.getBuilder()
                     .src("https://cdn.helper.com/itemimage/453")
                     .height(740)
                     .width(640)
                     .build()
```

해당 패턴은 빌더패턴이며 방금처럼 많은 사람들이 많이 쓴다. 해당 패턴이 잘못된 것이 아닌 위에서 이해하다싶이 저기서 하나하나의 메소드는 self를 리턴하기에 상관이 없다.

#### 명령-쿼리 분리

이 책에선 이를 명령-퀴리 분리라고 한다. 하지만 그래프ql에 관심이 있는 사람은 해당내용이 어떠한 말을 하는 지 알 것이다. 나는 이 패턴을 보고 Mutation, Query가 생각이 났다. 명령이라고는 하나 해당 명령은 즉 객체의 상태를 바꾸거나 행동을 바꾸는 일이기에 Mutation이라고 생각한다. 그리고 이를 안지킬시에 디버깅이 힘들어진다는 것을 알앗다.