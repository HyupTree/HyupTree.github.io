---
layout: til
title: "데이터베이스 기초 개념"
date: 2024-07-12
category: database
tags: [database, sql, rdbms, nosql]
---

# 데이터베이스 기초 개념

## 데이터베이스란?
- 조직화된 데이터의 집합
- 여러 사용자가 공유하여 사용할 목적으로 통합하여 관리되는 데이터의 집합
- DBMS(Database Management System)를 통해 관리

## RDBMS vs NoSQL

### RDBMS (관계형 데이터베이스)
- **구조**: 테이블, 행, 열로 구성
- **특징**: ACID 속성 보장
- **언어**: SQL 사용
- **예시**: MySQL, PostgreSQL, Oracle, SQL Server

```sql
-- 테이블 생성 예시
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### NoSQL (비관계형 데이터베이스)
- **유형**: Document, Key-Value, Column-family, Graph
- **특징**: 수평적 확장성, 유연한 스키마
- **예시**: MongoDB, Redis, Cassandra, Neo4j

## ACID 속성
- **Atomicity(원자성)**: 트랜잭션의 모든 연산이 완전히 수행되거나 전혀 수행되지 않음
- **Consistency(일관성)**: 트랜잭션 수행 전후 데이터베이스가 일관된 상태 유지
- **Isolation(독립성)**: 동시에 실행되는 트랜잭션들이 서로 영향을 주지 않음
- **Durability(지속성)**: 성공적으로 완료된 트랜잭션의 결과는 영구적으로 반영

## 정규화 (Normalization)
데이터의 중복을 최소화하고 일관성을 유지하기 위한 과정

### 제1정규형 (1NF)
- 각 속성은 원자값을 가져야 함
- 반복되는 그룹이 없어야 함

### 제2정규형 (2NF)
- 1NF를 만족하고
- 완전 함수적 종속을 만족해야 함

### 제3정규형 (3NF)
- 2NF를 만족하고
- 이행적 종속을 제거해야 함

## 오늘의 학습 포인트
- 데이터베이스는 단순한 데이터 저장소가 아닌 체계적인 데이터 관리 시스템
- RDBMS와 NoSQL은 각각의 장단점이 있어 사용 목적에 따라 선택해야 함
- 정규화는 데이터 일관성 유지에 중요하지만, 성능과의 트레이드오프 고려 필요 