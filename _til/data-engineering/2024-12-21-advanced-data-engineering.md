---
layout: til
title: "고급 데이터 엔지니어링 개념들"
date: 2024-12-21
category: data-engineering
tags: [data-engineering, etl, pipeline, streaming, batch]
---

# 고급 데이터 엔지니어링 개념들

## 데이터 파이프라인 아키텍처

### 배치 처리 vs 스트림 처리

#### 배치 처리 (Batch Processing)
- **특징**: 정해진 시간 간격으로 대량의 데이터를 한 번에 처리
- **장점**: 안정성, 높은 처리량, 복잡한 분석 가능
- **단점**: 실시간성 부족, 지연 시간 존재
- **도구**: Apache Spark, Hadoop MapReduce, Apache Airflow

```python
# Spark 배치 처리 예시
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("BatchProcessing").getOrCreate()

# 데이터 읽기
df = spark.read.parquet("hdfs://data/sales/2024/")

# 변환
daily_sales = df.groupBy("date", "product_id") \
                .agg({"amount": "sum", "quantity": "sum"}) \
                .withColumnRenamed("sum(amount)", "total_amount") \
                .withColumnRenamed("sum(quantity)", "total_quantity")

# 저장
daily_sales.write.mode("overwrite").parquet("hdfs://output/daily_sales/")
```

#### 스트림 처리 (Stream Processing)
- **특징**: 실시간으로 들어오는 데이터를 즉시 처리
- **장점**: 실시간 반응, 낮은 지연시간
- **단점**: 복잡성, 장애 처리 어려움
- **도구**: Apache Kafka, Apache Flink, Apache Storm

```python
# Kafka Streams 예시 (Python)
from kafka import KafkaConsumer, KafkaProducer
import json

consumer = KafkaConsumer(
    'raw-events',
    bootstrap_servers=['localhost:9092'],
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda x: json.dumps(x).encode('utf-8')
)

for message in consumer:
    event = message.value
    
    # 실시간 변환
    processed_event = {
        'user_id': event['user_id'],
        'timestamp': event['timestamp'],
        'action': event['action'],
        'processed_at': time.time()
    }
    
    # 처리된 데이터 전송
    producer.send('processed-events', processed_event)
```

## 데이터 레이크하우스 아키텍처

### Delta Lake
- **특징**: ACID 트랜잭션을 지원하는 오픈소스 스토리지 레이어
- **장점**: 데이터 레이크의 유연성 + 데이터 웨어하우스의 안정성

```python
from delta.tables import DeltaTable
from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \
    .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog") \
    .getOrCreate()

# Delta 테이블 생성
df.write.format("delta").save("/delta/customer_data")

# 시간 여행 (Time Travel)
old_data = spark.read.format("delta") \
    .option("timestampAsOf", "2024-01-01") \
    .load("/delta/customer_data")

# UPSERT 작업
deltaTable = DeltaTable.forPath(spark, "/delta/customer_data")
deltaTable.alias("target").merge(
    new_data.alias("source"),
    "target.customer_id = source.customer_id"
).whenMatchedUpdateAll() \
 .whenNotMatchedInsertAll() \
 .execute()
```

## 데이터 품질 관리

### 데이터 검증 및 모니터링
```python
import great_expectations as ge

# 데이터 검증 설정
df_ge = ge.from_pandas(df)

# 데이터 품질 규칙 정의
expectation_suite = df_ge.expect_column_values_to_not_be_null("customer_id")
expectation_suite = df_ge.expect_column_values_to_be_between("age", 0, 120)
expectation_suite = df_ge.expect_column_values_to_match_regex("email", r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')

# 검증 실행
validation_result = df_ge.validate()
print(f"데이터 품질 검증 결과: {validation_result['success']}")
```

### 데이터 혈통 추적 (Data Lineage)
데이터의 출처, 변환 과정, 최종 목적지를 추적하는 시스템

```yaml
# Apache Atlas를 활용한 데이터 혈통 예시
lineage:
  source: 
    - type: database
      name: production_db
      table: user_activities
  transformations:
    - step: 1
      operation: filter
      description: "활성 사용자만 필터링"
    - step: 2
      operation: aggregate
      description: "일별 활동 집계"
  destination:
    - type: data_warehouse
      name: analytics_dw
      table: daily_user_metrics
```

## 실시간 데이터 처리 패턴

### Lambda 아키텍처
- **배치 레이어**: 대용량 데이터 처리
- **스피드 레이어**: 실시간 데이터 처리
- **서빙 레이어**: 배치와 실시간 결과 통합

### Kappa 아키텍처
- 모든 데이터를 스트림으로 처리
- 배치 처리도 스트림 처리의 특수한 경우로 간주

```python
# Kappa 아키텍처 예시 - Apache Beam
import apache_beam as beam
from apache_beam.options.pipeline_options import PipelineOptions

def process_event(element):
    # 실시간 이벤트 처리 로직
    return {
        'user_id': element['user_id'],
        'processed_timestamp': time.time(),
        'event_count': 1
    }

with beam.Pipeline(options=PipelineOptions()) as pipeline:
    (pipeline
     | 'Read from Kafka' >> beam.io.ReadFromKafka(
         consumer_config={'bootstrap.servers': 'localhost:9092'},
         topics=['user-events'])
     | 'Process Events' >> beam.Map(process_event)
     | 'Window into Sessions' >> beam.WindowInto(
         beam.window.Sessions(gap_size=600))  # 10분 세션
     | 'Aggregate by User' >> beam.GroupByKey()
     | 'Write to BigQuery' >> beam.io.WriteToBigQuery(
         'project:dataset.user_sessions'))
```

## 데이터 보안 및 거버넌스

### 데이터 마스킹
```python
import hashlib
import pandas as pd

def mask_pii(df, columns_to_mask):
    """개인정보 마스킹 함수"""
    df_masked = df.copy()
    
    for col in columns_to_mask:
        if col in df.columns:
            df_masked[col] = df[col].apply(
                lambda x: hashlib.sha256(str(x).encode()).hexdigest()[:8]
            )
    
    return df_masked

# 사용 예시
masked_data = mask_pii(customer_data, ['email', 'phone', 'ssn'])
```

### RBAC (Role-Based Access Control)
```sql
-- 데이터 접근 권한 관리 예시
CREATE ROLE data_analyst;
CREATE ROLE data_scientist;
CREATE ROLE data_engineer;

-- 권한 부여
GRANT SELECT ON analytics.customer_summary TO data_analyst;
GRANT SELECT, INSERT ON analytics.* TO data_scientist;
GRANT ALL PRIVILEGES ON *.* TO data_engineer;

-- 사용자에게 역할 할당
GRANT data_analyst TO user_alice;
GRANT data_scientist TO user_bob;
```

## 성능 최적화

### 파티셔닝 전략
```python
# 날짜 기반 파티셔닝
df.write \
  .partitionBy("year", "month") \
  .parquet("/data/sales_partitioned/")

# 해시 파티셔닝
df.repartition(10, "customer_id") \
  .write.parquet("/data/customer_partitioned/")
```

### 캐싱 및 인덱싱
```python
# Spark 캐싱
frequently_used_df = spark.sql("""
    SELECT customer_id, total_purchases, last_activity_date
    FROM customer_summary
    WHERE status = 'active'
""").cache()

# Delta Lake Z-Ordering (컬럼 클러스터링)
spark.sql("""
    OPTIMIZE delta.`/path/to/table`
    ZORDER BY (customer_id, purchase_date)
""")
```

## 오늘의 학습 포인트
- 배치와 스트림 처리는 각각의 특성에 맞는 적절한 활용이 중요
- 데이터 레이크하우스 아키텍처는 현대적인 데이터 플랫폼의 핵심
- 데이터 품질 관리와 거버넌스는 신뢰할 수 있는 데이터 시스템의 필수 요소
- 성능 최적화는 데이터 볼륨 증가에 대응하기 위한 지속적인 과제 