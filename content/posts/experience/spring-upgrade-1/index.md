---
title: Spring 5 업그레이드 고군분투 (1)
date: "2024-02-18T23:00:00.000Z"
layout: post
path: "/spring-upgrade-1/"
category: Experience
tags:
  - Spring
  - Jedis
  - Lettue
---

## 왜 Spring 5를 업그레이드 해야했을까?

[2022년 카카오 장애](https://namu.wiki/w/sk%20c%26c%20%ed%8c%90%ea%b5%90%20%eb%8d%b0%ec%9d%b4%ed%84%b0%ec%84%bc%ed%84%b0%20%ed%99%94%ec%9e%ac%eb%a1%9c%20%ec%9d%b8%ed%95%9c%20%ec%9d%b8%ed%84%b0%eb%84%b7%20%ec%84%9c%eb%b9%84%ec%8a%a4%20%ec%9e%a5%ec%95%a0%20%ec%82%ac%ea%b1%b4)를 다들 기억할 것이다. 카카오톡 뿐만이 아닌, 많은 카카오 서비스가 안되었다. 그리고 안된 것은 카카오 서비스 뿐만이 아니였다. 카카오 로그인을 활용한 국내의 많은 서비스들이 정상적으로 동작하지 않았었다. 이 중 가장 문제가 심했던 것은 카카오 로그인이 안되었 던 것이지 않을까 싶다.

<img style="height: 200px;" src="./kakao.jpeg" alt="kakao" />

나 또한 로그인 관련한 장애를 두 번 정도 만들었고, 이 과제를 받을 당시에도 인증/인가와 관련된 팀이였기에 해당 장애가 더더욱 와닿았고 팀에서도 각종 장애를 대비하여 유연한 시스템을 만들기로 하였다.
그래서 가장 잘하는 두 분이 Redis의 Dependency를 줄이는 작업을 진행하였다. 인증/인가는 필연적으로 Redis와 의존도가 가장 높았고 장애가 자주 나서 해당 Dependency를 줄이기로 했다.
이 두 분이 열심히 작업하고 난 후, Redis를 직접 꺼서 확인을 진행하였다! 이 작업에 나도 운이 좋게 지원을 하게되어 같이 진행하였다. <b>그리고 결과는,,, 매우 슬프게도 원하는 대로 동작하지 않았다. Jedis 때문이였다.</b>

<!--more-->

## 왜 Jedis가 문제일까?

Jedis는 멀티스레드 클라이언트이다. 그리고 풀을 같이 사용하는 경우가 많고 가장 많이 사용하는 풀은 Common DBCP이다.

> 자세히 보실 분은 해당 링크를 확인해주세요!
> [D2 Naver Common DBCP](https://d2.naver.com/helloworld/5102792) [Jedis & Jedis with Pool & Lettuce performance](https://jojoldu.tistory.com/418)

Jedis의 설정 중 Client Abort Time, retry가 있다. 또한 DBCP의 MaxWaitMillis이 있다.
만약 성급한 최적화를 한다면 문제는 다음과 같이 발생할 수 있다.

1. Redis의 장애
2. Client Abort Time동안 Pool의 쓰레드가 기다림
3. 기다린 후, Retry 설정에 의해 N번 시도
4. 모든 Pool이 점유
5. 모든 Redis 요청이 MaxWaitMillis동안 기다림

이렇게 되면 최악의 경우 사실상의 500ms내로 응답해야하는 정상적인 SLA를 보장할 수 없으며 이는 시스템의 전반적인 장애로 귀결된다.

팀에서는 안타깝게 이러한 설정들을 쓰고 있었기에 문제가 되었다. 더이상의 최적화는 힘들기에 결국 lettuce 이전을 하기로 하였다. 사내에서는 이를 wrapping한 Inhouse SDK를 사용해야했었고 최소 요구사항은 Spring 5였다.
하지만 팀에서 쓰고 있는 Spring의 버전은 4였다. 그렇게 나는 Spring 5로 업그레이드를 시작했다.
