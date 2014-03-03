var slideshowInit;

$(document).ready(function() {
  // load posts from tumblr
  var blog = 'peacecorps.tumblr.com';
  $.ajax({
    url: 'http://api.tumblr.com/v2/blog/' + blog + '/posts/text?notes_info=true&limit=3&filter=text&api_key=cA9agkd1WdAsFUFL5iq1Wnn0m4Dmcv5vf5otES3Ou08r2D3Ldu',
    type: 'GET',
    contentType: 'application/json',
    dataType: 'jsonp',
    jsonpCallback: 'jsonp',
    success: function (result) {
      $("#blog-loading").hide();
      for (i in result.response.posts) {
        // render post to the page
        var post = result.response.posts[i]
        $('#blog' + i + ' .blog-title').html(post.title);
        $('#blog' + i + ' .blog-title').attr('href', post.post_url);
        $('#blog' + i + ' .blog-date').html(post.date);
        $('#blog' + i + ' .blog-snippet').html(post.body);
        var tagHtml = '';
        for (j in post.tags) {
          if (j !== 0) {
            tagHtml += ', ';
          }
          tagHtml += '<a href="http://' + blog + '/tagged/' + encodeURIComponent(post.tags[j]) + '">' + post.tags[j] + '</a>';
        }
        $('#blog' + i + ' .blog-tags').html(tagHtml);
        $('#blog' + i).show();
      }
      $(".blog-snippet").dotdotdot();
    },
    error: function (e) {
      $("#blog-loading .error").show();
    }
  });


  // SLIDESHOW
  var slideshowInit = function() {
    var $slideshow = $('#slideshow');
    var $slideshow_wrapper = $('.slideshow-wrapper');
    var $slides = $slideshow.find('.slide');
    var $photo_credit = $('.photo-credit');
    var num = Math.floor((Math.random()*$slides.length)+1);
    var $slide = $($slides[num-1]); // get random slide
    var caption = '<i class="icon-camera"></i> <span>'+$slide.attr('alt')+'</span>';
    $slideshow_wrapper.append($slide);
    $photo_credit.html(caption).fadeIn();
  }
  slideshowInit();
  // END SLIDESHOW

  // linear fade-ins
  $('.fadeIn').each(function(e) { 
    $(this).addClass('fade-'+e)
    var t = setTimeout("$('.fade-"+e+"').fadeIn(500)",500*e)
  });
});
