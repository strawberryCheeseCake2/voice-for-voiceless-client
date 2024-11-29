const constants = {
  devilName: "DEVIL",
  devilImg: "devil.png",
  loggedInAs: "Logged In as",
  secretDmPlaceholder: "Type message to send to Devil's Advocate",
  messagePlaceholder: "Type message here",
  sendDmSecretly: "Send DM Secretly",
  send: "Send",
  didntCreateUsername: "Didn't Create Username?",
  alreayCreatedUsername: "Already created username?",
  createUsername: "Create Username",
  signUp: "Sign Up",
  signIn: "Sign In",
  anonymousComments: "Anonymous Comments",
  signInPlaceholder: "Type username to join chat",
  signUpPlaceholder: "Type username to create one",
}

// const constants = {
//   devilName: "DEVIL",
//   loggedInAs: "로그인한 유저네임",
//   secretDmPlaceholder: "악마의 대변인에게 보낼 메세지를 입력하세요",
//   messagePlaceholder: "메세지를 입력하세요",
//   sendDmSecretly: "악마의 대변인에게 DM 보내기",
//   send: "보내기",
//   didntCreateUsername: "유저네임을 만들지 않으셨나요?",
//   alreayCreatedUsername: "이미 유저네임을 만드셨나요?",
//   createUsername: "유저네임 만들기",
//   signUp: "유저네임 생성하기",
//   signIn: "로그인하기",
//   anonymousComments: "익명의 코멘트",
//   signInPlaceholder: "유저네임을 입력하여 채팅에 참여하세요",
//   signUpPlaceholder: "유저네임을 입력하여 생성하세요",
// }

const imageSrc = {
  devil: "img/devil.jpg",
  box: "img/box.png",
  profile:"img/profile.png"
}

const mode: string = "PROD"

// ./loophole http 8000 --hostname condcb
// https://webstory.github.io/2023/Cloudflare-Tunnel/
// /home/user/.cloudflared/679c468e-c718-4855-9e16-e55199f3a2c9.json
const serverBase = "vfvtestapp.uk"
// const serverBase = "localhost:8000"
// const serverBase = "vfv-conda-blhne4gbqq-du.a.run.app"
// const serverBase = "vfv-condc-blhne4gbqq-du.a.run.app"
// const serverBase = "voiceforvoiceless.loca.lt"

const urls = {
    httpBase: `${mode !== "PROD" ? "http" : "https"}://${serverBase}`,
    wsBase: `${mode !== "PROD"? "ws" : "wss"}://${serverBase}/ws`,
}

export {constants, urls, imageSrc}