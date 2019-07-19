# PM2 TEMPLETE 사용법
## 프로젝트 복제
1. 이 PM2_TEMPLETE프로젝트를 Fork
2. Fork한 프로젝트의 Setting으로 이동
3. Setting - General - Project Name을 원하는 이름으로 변경
4. Setting - Advanced - Rename repository에서 Project name과 path를 변경
5. (옵션)Setting - Advanced - Transfer project에서 BlockChain Group으로 Transfer
6. Setting - Advanced - Remove fork relationship에서 fork를 제거


## Dependency
  - nodejs = v9.6.1 
  - npm = v5.6.0

## install
```
npm install -g pm2
pm2 install pm2-logrotate   //log파일 로테이트
```



## Process Message 예시
> 형식은 프로잭트 진행 과정에서 추가/수정이 있을 수 있음
> {type, data, topic} 형식은 유지하며, data안의 내용을 변경하는 방식을 권장

#### Send
```bash
process.send({
    type: 'process:msg',
    data: {
        target : 'child-1',
        text : 'send message template'
    },
    topic: 'my topic'
});
```

#### receive
```bash
process.on('message', function(packet) {
    if(packet.data.target === 'child-2'){
        console.log('Child(2) Received:\n', packet.data);
    }
});
```


## pm2 사용법
> start.json 이름 및 내용을 프로젝트 특성에 맞춰 변경한다.

#### 시작
```
pm2 start start.json
```
#### 중지
```
pm2 stop start.json
```
#### 재시작
> 소스코드 업데이트시 사용

```
pm2 restart start.json
```
#### 삭제
```
pm2 delete start.json
```
#### 모니터링
```
pm2 monit
```
#### 로그확인
```
pm2 log start.json
```


###mocha
        // "test": "mocha $(find ./ -name '*.js') --recursive -w"
