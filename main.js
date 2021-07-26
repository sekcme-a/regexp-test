const str = `
010-1234-5678
thesecon@gmail.com
https:/www.omdbapi.com/?apikey=7035c60c&s=frozen
The quick brown fox jumps over the lazy dog.
abbccdddd
`
//''나""는 안에서 줄바꿈을 해줄 수 없다.
//그래서 백틱기호`` 사용. 정규표현식과는 관계없음.

let regexp = new RegExp('the', '')
console.log(str.match(regexp)) //the 가 들어간 부분이 1개 출력됨

regexp = new RegExp('the', 'g') //g: 조건에 맞는 모두 검색
console.log(str.match(regexp)) //["the", "the"]
//str의 4번쨰 줄에 The는 포함이 안되는 이유는 대문자가 있어서.

regexp = new RegExp('the', 'gi') //i: 대소문자 구분안함.
console.log(str.match(regexp)) //["the", "The", "the"]

//위 식을 리터럴형식으로 표현하면,
regexp = /the/gi


//------------------------------------------------
regexp = /fox/gi
console.log(regexp.test(str)) //true //fox라는 문자가 str에 있기 때문
regexp = /HEROPY/gi
console.log(regexp.test(str)) //false

regexp = /fox/gi
console.log(str.replace(regexp, 'AAA'))
//fox라는 문구를 AAA로 대체
//원본을 바꿔주지 않음. (원본을 바꾸고 싶으면:
//str을 const가 아닌 let을 바꿔주고, 
//str = console.log(str.replace(regexp, 'AAA'))이렇게 str을 재할당)


//------------------------------------------------------------
regexp = /the/
console.log(str.match(regexp))

regexp = /the/g
console.log(str.match(regexp))

regexp = /the/gi
console.log(str.match(regexp))

console.log(str.match(/the/gi)) //이렇게 바꿔도 됨

//마침표를 찾고싶다면,
// /./ 이렇게 하면 안된다.
// 정규표현식에서 마침표 하나는 명령에 사용되기 때문에
// 명령이 아닌 그냥 문자로 쓰고 싶을때는 \를 이용한다.
// 이스케이프 문자로, \를 통해 본래의 기능에서 벗어나
// 상태가 바뀌는 문자를 말한다.
console.log(str.match(/\./gi)) //[".", ".", ".", "."]

//$ 는 문장의 맨 끝을 의미한다.
//아래의 정규표현식을 해석하면, 
//모든 문자를 대소문자구문없이 확인하며, 문장의 맨 끝에 .
//이 있으면 반환
console.log(str.match(/\.$/gi)) //null
//문장의 끝이 cccdddd`로 끝나기 때문에 null값 반환

//m은 모든 줄바꿈한 줄을 시작과 끝 시작과 끝 이렇게
//각각 따로 검색하게 만든다.
console.log(str.match(/\.$/gim)) //["."]
//4번째 줄에 lazy dog. 마침표가 있기때문에 1개출력됨.


//------------------------------------------------

console.log(
  str.match(/d$/g), //null
  //줄의 끝부분이 d인것을 검색
  //보기에는 str의 끝부분이 cccdddd로 검색이 되야하는것 같지만,
  //cccdddd줄바꿈`이기 때문에 끝부분이 d로 인식되지 않는다.
  //d`이렇게 끝나면 d가 검색됨
  str.match(/^t/gim), //["t", "T"]
  str.match(/./g),//(132) ["0", "1", "0", "-", "1", "2", "3", "4", "-", "5", "6", "7", "8", "t", "h", "e", "s", "e", "c", "o", "n", "@", "g", "m", "a", "i", "l", ".", "c", "o", "m", "h", "t", "t", "p", "s", ":", "/", "w", "w", "w", ".", "o", "m", "d", "b", "a", "p", "i", ".", "c", "o", "m", "/", "?", "a", "p", "i", "k", "e", "y", "=", "7", "0", "3", "5", "c", "6", "0", "c", "&", "s", "=", "f", "r", "o", "z", "e", "n", "T", "h", "e", " ", "q", "u", "i", "c", "k", " ", "b", "r", "o", "w", "n", " ", "f", "o", "x", " ", "j", …]
  str.match(/http/g),//["http"]
  str.match(/h..p/g),//["http"]
  str.match(/fox|dog/g),//["fox", "dog"] //fox또는 dog반환
  str.match(/https?/g),//https나 http를 반환
  //https에서 s가 없거나 s와 일치

  str.match(/d{2}/g), //["dd", "dd"]
  str.match(/d{2,}/g), //["dddd"]
  str.match(/d{2,3}/g), //["ddd"]

  str.match(/\w{2,3}/g), //\w:숫자나 영어 알파벳
  // ["010", "123", "567", "the", "sec", "on", "gma", "il", "com", "htt", "ps", "www", "omd", "bap", "com", "api", "key", "703", "5c6", "0c", "fro", "zen", "The", "qui", "ck", "bro", "wn", "fox", "jum", "ps", "ove", "the", "laz", "dog", "abb", "ccd", "ddd"]
  // 별로 유용해 보이지 않는다.
  str.match(/\b\w{2,3}\b/g) //\b\b:숫자나 영어 알파벳이
  //아닌 경우 경계를 만든다.
  // ["010", "com", "www", "com", "The", "fox", "the", "dog"]
)

//-------------------------------------
console.log(
  str.match(/[0-9]{1,}/g),
  str.match(/[가-힣]{1,}/g),
  str.match(/\w/g),
  str.match(/\bf\w{1,}\b/g),
    //소문자 f로 시작하는 모든 영단어 찾기
  str.match(/\d{1,}/g),
  str.match(/\s/g),

  str.match(/.{1,}(?=@)/g),
  str.match(/(?<=@).{1,}/g)
  //뒷쪽일치는 이렇게 뒤에다 써야됨.
)