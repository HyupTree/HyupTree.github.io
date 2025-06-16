---
layout: til
title: "파이썬 문법 필수 요소들"
date: 2024-10-05
category: python
tags: [python, syntax, programming, basics]
---

# 파이썬 문법 필수 요소들

## 변수와 데이터 타입

### 기본 데이터 타입
```python
# 숫자형
integer_num = 42
float_num = 3.14
complex_num = 3 + 4j

# 문자열
string_var = "Hello, Python!"
multi_line = """
여러 줄
문자열
"""

# 불린
is_true = True
is_false = False

# None
empty_var = None
```

### 컬렉션 타입
```python
# 리스트 (가변)
fruits = ['apple', 'banana', 'cherry']
fruits.append('date')

# 튜플 (불변)
coordinates = (10, 20)

# 딕셔너리
person = {
    'name': 'Alice',
    'age': 30,
    'city': 'Seoul'
}

# 세트
unique_numbers = {1, 2, 3, 4, 5}
```

## 제어 구조

### 조건문
```python
score = 85

if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
else:
    grade = 'F'

# 삼항 연산자
result = "Pass" if score >= 60 else "Fail"
```

### 반복문
```python
# for 루프
for i in range(5):
    print(f"숫자: {i}")

# 리스트 순회
for fruit in fruits:
    print(fruit)

# 딕셔너리 순회
for key, value in person.items():
    print(f"{key}: {value}")

# while 루프
count = 0
while count < 5:
    print(count)
    count += 1
```

## 함수

### 기본 함수 정의
```python
def greet(name, greeting="안녕하세요"):
    """인사 함수"""
    return f"{greeting}, {name}님!"

# 함수 호출
message = greet("홍길동")
custom_message = greet("김철수", "반갑습니다")
```

### 고급 함수 기능
```python
# 가변 인자
def sum_all(*args):
    return sum(args)

# 키워드 인자
def create_profile(**kwargs):
    return kwargs

# 람다 함수
square = lambda x: x ** 2
numbers = [1, 2, 3, 4, 5]
squared = list(map(square, numbers))
```

## 클래스와 객체

### 기본 클래스
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"저는 {self.name}이고, {self.age}살입니다."
    
    def __str__(self):
        return f"Person(name={self.name}, age={self.age})"

# 객체 생성
person1 = Person("앨리스", 25)
print(person1.introduce())
```

### 상속
```python
class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)
        self.student_id = student_id
    
    def study(self, subject):
        return f"{self.name}이(가) {subject}를 공부하고 있습니다."

student = Student("밥", 20, "2024001")
print(student.study("파이썬"))
```

## 예외 처리
```python
try:
    number = int(input("숫자를 입력하세요: "))
    result = 10 / number
    print(f"결과: {result}")
except ValueError:
    print("유효한 숫자를 입력해주세요.")
except ZeroDivisionError:
    print("0으로 나눌 수 없습니다.")
except Exception as e:
    print(f"예상치 못한 오류: {e}")
finally:
    print("프로그램이 종료됩니다.")
```

## 리스트 컴프리헨션
```python
# 기본 형태
squares = [x**2 for x in range(10)]

# 조건부 컴프리헨션
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# 딕셔너리 컴프리헨션
word_lengths = {word: len(word) for word in ['hello', 'world', 'python']}

# 세트 컴프리헨션
unique_lengths = {len(word) for word in ['hello', 'world', 'python', 'code']}
```

## 모듈과 패키지
```python
# 내장 모듈 임포트
import os
import sys
from datetime import datetime, timedelta

# 특정 함수만 임포트
from math import sqrt, pi

# 별칭 사용
import numpy as np
import pandas as pd

# 현재 시간
now = datetime.now()
print(f"현재 시간: {now}")
```

## 오늘의 학습 포인트
- 파이썬의 간결하고 읽기 쉬운 문법이 생산성을 높여줌
- 리스트 컴프리헨션은 Pythonic한 코드 작성의 핵심
- 예외 처리를 통해 견고한 프로그램 작성 가능
- 클래스와 상속을 활용하여 객체지향 프로그래밍 구현 