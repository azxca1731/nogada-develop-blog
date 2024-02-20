---
title: Spring 5 업그레이드 고군분투 (2)
date: "2024-02-20T23:33:00.000Z"
layout: post
path: "/spring-upgrade-2/"
category: Experience
tags:
  - Spring
  - Jedis
  - Lettue
---

## 스프링 업그레이드 조사 시작!

> 이어지는 내용입니다. 전 포스트를 확인해주세요.
> [Spring 5 업그레이드 고군분투 (1)](/spring-upgrade-1/)

내가 업그레이드 해야하는 스펙은 다음과 같다.

- 편의를 위해 만든 스프링을 래핑한 레거시 프레임워크(더이상 관리 안됨)
- Spring 4
- MySQL(QueryDSL, JPA, MyBatis, Spring-data-common-1,), Redis(Spring-data-redis-1, Jedis), Kafka를 사용
- 25%의 낮은 유닛 테스트 커버리지(더이상 쓰지 않는 코드의 테스트 커버리지가 더 높았음)
- 10+년이 지난 코드
- 400+ 여개의 API
- 500 ms 내의 응답
- 99.999%의 가용성
- 한국과 대만, 두 개의 Region에 서비스
- Batch, Admin, API, Core의 4개의 모듈

내가 본 적도 없는 요구사항. 압도되었다. 그 중에서 가장 힘든 부분으로 예상되는 것은 역시 레거시 프레임워크와 스프링 5의 디펜던시 부분이였다.
팀원들과 이야기 후 다음과 같은 마일 스톤으로 일을 진행하였다.

1. 레거시 프레임워크 Deprecation
2. 스프링 5 업그레이드
3. 레튜스 기반 인하우스 SDK 업그레이드

이렇게 업무를 시작하였다.

<!--more-->

## Deprecation Start!

레거시 프레임워크를 분석해야했다. 어디서 어떻게 쓰이는지, 모든 코드를 확인하여 총 20개의 유지되지 않은 라이브러리를 확인하였다.
이 중에서 14개의 프레임워크에서 스프링을 사용하고, 6개가 직접적으로 예전 스프링 버전을 액세스 하였다.

이 6개를 삭제하였고 공통으로 쓰는 로직을 내부의 로직으로 변경하였다.

그러던 와중에 팀원 분의 제안으로 바로 스프링 5 업그레이드를 같이 하기 시작하였다.

여기까진 괜찮았다.

<hr />

## Spring 5 업그레이드 시작

스프링 4에서 5로 올릴 때 필요한 부분은 다음과 같다.
너무 많아 대략적으로 키워드 기반으로 묘사하겠다.

#### JPA & QueryDSL 업그레이드

에러가 바로바로 나와 업그레이드 하기 수월하다.
난이도: 하

1. delete -> deleteAll or deleteById
2. PageRequest -> PageRequest.of
3. findOne -> findById (with Optional)
4. Specification -> add JpaSpecificationExcecutor in repository
5. persist -> save
6. QueryDslRepositorySupport -> QuerydslRepositorySupport

#### Spring Data Redis 업그레이드

이 부분도 에러가 바로 나오지만 많은 부분이 바뀌었으며, 직접 실행시켜 확인이 필요한 부분이 많다.
주의를 요한다. <b>총 4개이지만 나중에 후술</b>

난이도: 중 -> 최상(이 부분은 따로 후술하겠다.)

1. CacheManager의 초기화 방법 변화
2. null을 리턴하는 메소드의 어노테이션에 unless="#result == null" 추가 (안할시 Exception)

#### CookieLocaleResolver 설정 변경

스프링 4의 경우 Java 레거시 스타일의 방식(ex:ko_KR)으로 쿠키의 값을 세팅한다. 하지만 스프링 5는 [BCP-47](https://www.rfc-editor.org/info/bcp47) 방식(ex:ko-KR)으로 저장한다.
이로 인하여 스프링 4에서는 스프링 5방식으로 된 쿠키를 읽을 수 없어 동시에 배포가 되있을 시에 에러가 난다.

이를 방지하기 위해서는 languageTagCompliant를 false로 세팅하여 BCP-47방식으로 저장하지 않게 하여 해당 에러를 방지한다.

#### Bean Retention 점검

이는 시간이 없어서 제대로된 이유를 하지 못했다...
기존의 코드는 Annotation의 Retention을 제대로 설정하지 않아도 Spring 4에서 확인 할 수 있어, Bean을 생성, 주입하는데 문제가 없었다.

하지만 신규 코드에서는 버그가 픽스가 된 것인지, Retention을 제대로 설정해야만 확인할 수 있었다.

이에 어노테이션을 직접 확인하는 코드에 Retention을 Runtime으로 설정하여 제대로 빈을 인식할 수 있도록 하였다.

> [Retention에 대하여](https://www.geeksforgeeks.org/java-retention-annotations/)

#### Dependency Conflict

답이 없다.... 일일이 하나하나 dependency tree를 확인하여, 해결하도록 하자.

<hr />

## 드디어 배포...?

이렇게 로컬에서 성공적으로 서버를 가동시켰다. 하지만 이 코드를 배포할 수 있을까...?
이제 테스트를 할 차례였지만 도저희 용기가 나지 않았다. 배포 전략 및 테스트 전략이 필요하였다.
이는 다음에 마저 기술하겠다.
