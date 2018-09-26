// 画像アクセスする際のプラグインのidを含むURL取得
imgURL = chrome.extension.getURL('img/');

// 背景画像の変更
$(function(){
  if(checkBirthday())
    changeBG();
  pageChangeEventListner();
});

// ページ遷移を伴わない移動での誕生日チェック
function pageChangeEventListner(){
// タイムラインなどからユーザページに飛んだ際に、ページ遷移を伴わない移動なのでloadなどのイベントが走らない。
// そこで、page-containerの子要素に変更があったかを検知して、起動条件にする。
  // var targetNode = document.getElementById('page-container');  // ユーザページ -> ユーザページで発火しない。
  var targetNode = document.querySelector('body');  // bodyとかしておかないと、ユーザページのおすすめユーザとかにリンクしたときにうまく動作しない。
  var config = { childList: true, subtree: false};
  var callback = function(mutationsList, observer) {
    for(var mutation of mutationsList) {
      if (mutation.type == 'childList') {
        // 子要素に変化がある -> pjax的なページ遷移があった(ってことにする)
        if(checkBirthday()){
          changeBG();
        }
      }
    }
  };
  var observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
  // Later, you can stop observing
  // observer.disconnect();
}

// 誕生日であるかどうかの判定
function checkBirthday(){
  // プロフィールの誕生日の日付の部分の文字列によって、誕生日であるかの判定をする。
  var birthdayText = $('.ProfileHeaderCard-birthdateText').children().text();
  if( birthdayText == '  お誕生日おめでとうございます\n'  || birthdayText == '  今日はお誕生日です。\n') return true;
  return false;
}
function changeBG(){
  // 背景画像を寿司にする
  $('#page-container').css('background-size','300px');
  $('#page-container').css('background-image', 'url("' + imgURL + 'kabegami.jpg' + '")');

  // 文字のある部分の背景だけ白っぽくする
  $('.AppContent-main').css('background-color', 'rgba(255, 255, 255, 0.7)');
}

// 要素が追加されたら呼ばれる関数。ブラウザやバージョンによって対応が異なるらしいいが...Chrome拡張で動かすのでブラウザはOK。最新版のChromeで動いたから...許して〜
// 要素が追加されるごとに呼び出されるのでちょっとクレイジー
document.addEventListener('DOMNodeInserted', function() {
  $('.Balloon--blue').css('background-image','url("' +imgURL + 'maguro-mini.png' + '")');
  $('.Balloon--red').css('background-image','url("' +imgURL + 'ikura-mini.png' + '")');
  $('.Balloon--green').css('background-image','url("' +imgURL + 'uni-mini.png' + '")');
  $('.Balloon--purple').css('background-image','url("' +imgURL + 'ebi-mini.png' + '")');
  $('.Balloon--yellow').css('background-image','url("' +imgURL + 'tamago-mini.png' + '")');
}, false);
