$(function() {

  var search_list = $(".listview.js-lazy-load-images");  // 検索結果を表示するためのulタグの部分

  function appendProduct(product) {
    var html = `<li>
                  <a class="listview__element--right-icon" href="/products/${ product.id }/reviews/new" title="${ product.title }">
                    <div class="position-right p1em">
                      <i class="icon-chevron-right color-sub"></i>
                    </div>
                    <div class="row no-space-bottom">
                      <div class="col2">
                        <div class="thumbnail thumbnail--movies">
                          <div class="thumbnail__figure" style="background-image: url(${ product.image });" title="${ product.title }"></div>
                        </div>
                      </div>
                      <div class="col6 push6">
                        <h3 class="text-middle text-break">
                          <span class="color-sub">${ product.title }</span>
                        </h3>
                        <p class="text-xsmall text-overflow">
                          ${ product.detail }
                        </p>
                      </div>
                    </div>
                  </a>
                </li>`
    search_list.append(html);  // ulタグの子要素として変数htmlの中身を追加
  } // search.html.erbで<%= %>で囲われている部分は、jbuilderに書いてある変数に変更する

  function appendErrMsgToHTML(msg) {
    var html =  `<li>
                    <div class='listview__element--right-icon'>${ msg }</div>
                  </li>`
    search_list.append(html);  // ulタグの子要素として変数htmlの中身を追加
  }

  $(".search__query").on("keyup", function() {
    var input = $(".search__query").val();
    
    $.ajax({
      type: 'GET',
      url: '/products/search',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(products) {
      $(".listview.js-lazy-load-images").empty();  // 文字を入力する前にもともと表示されるようになっている映画情報を削除
      if (products.length !== 0) {  // productsが空ではない場合
        products.forEach(function(product){  // forEachメソッド。Rubyでいうeachメソッドの働きをしている
          appendProduct(product);
        });
      }
      else {
        appendErrMsgToHTML("一致する映画はありません");
      }
    })
    .fail(function() {
      alert('映画検索に失敗しました');
    });
  });
});
