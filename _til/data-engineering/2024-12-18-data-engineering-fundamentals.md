---
layout: til
title: "데이터 엔지니어링 기초 개념 정리"
date: 2024-12-18
category: data-engineering
subject: "Data Engineering"
tags: [data-engineering, ETL, 파이프라인, Apache-Spark, Airflow]
excerpt: "데이터 엔지니어링의 핵심 개념과 ETL 파이프라인 설계 원칙을 학습했다. 확장성과 신뢰성을 동시에 고려해야 하는 복합적인 업무구나."
---

## 배운 내용
데이터 엔지니어링의 핵심 개념과 주요 도구들에 대해 학습했다.

## 데이터 엔지니어링이란?
- **정의**: 데이터의 수집, 저장, 처리, 전송을 위한 시스템과 파이프라인을 설계하고 구축하는 분야
- **목표**: 안정적이고 확장 가능한 데이터 인프라 구축

## 주요 구성 요소

### 1. 데이터 수집 (Data Ingestion)
- **Batch Processing**: 정해진 시간에 대량 데이터 처리
- **Stream Processing**: 실시간 데이터 처리
- **도구**: Apache Kafka, Apache Flume, AWS Kinesis

### 2. 데이터 저장 (Data Storage)
- **Data Lake**: 원본 데이터 그대로 저장 (S3, HDFS)
- **Data Warehouse**: 구조화된 데이터 저장 (Snowflake, BigQuery)
- **NoSQL**: 비구조화 데이터 (MongoDB, Cassandra)

### 3. 데이터 처리 (Data Processing)
- **ETL**: Extract, Transform, Load
- **ELT**: Extract, Load, Transform (최신 트렌드)
- **도구**: Apache Spark, Apache Airflow, dbt

## 핵심 기술 스택
```bash
언어: Python, SQL, Scala
처리: Apache Spark, Apache Flink
오케스트레이션: Apache Airflow, Prefect
클라우드: AWS, GCP, Azure
```

## 데이터 파이프라인 설계 원칙
1. **확장성(Scalability)**: 데이터 볼륨 증가에 대응
2. **신뢰성(Reliability)**: 장애 시에도 데이터 무결성 보장
3. **모니터링**: 파이프라인 상태 실시간 추적
4. **재실행 가능성**: 실패 시 특정 지점부터 재실행

## 실습한 것
간단한 ETL 파이프라인을 Python과 pandas로 구현해봤다. CSV 파일에서 데이터를 읽어와서 전처리 후 데이터베이스에 저장하는 과정을 경험했다.

## 느낀 점
데이터 엔지니어링은 단순히 데이터를 옮기는 것이 아니라, 전체 데이터 생태계를 설계하는 복합적인 업무구나. 특히 확장성과 신뢰성을 동시에 고려해야 하는 점이 어려우면서도 흥미롭다.

## 다음 학습 계획
- Apache Airflow로 워크플로우 관리 실습
- Docker를 이용한 데이터 파이프라인 컨테이너화
- 클라우드 환경에서 데이터 파이프라인 구축

## 참고 자료
- [Apache Airflow 공식 문서](https://airflow.apache.org/)
- [데이터 엔지니어링 로드맵](https://github.com/datastacktv/data-engineer-roadmap) 