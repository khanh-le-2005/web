$(document).ready(function(){
    $('.sliderSlick').slick({
      dots: false,              // Hiển thị chấm tròn điều hướng bên dưới
      infinite: true,          // Cho phép lặp vô hạn
      arrows: false,
      speed: 500,              // Thời gian chuyển slide (ms)
      slidesToShow: 1,         // Số slide hiển thị 1 lần
      slidesToScroll: 1,       // Số slide trượt mỗi lần
      autoplay: true,          // Tự động chạy
      autoplaySpeed: 2000,     // Thời gian mỗi lần chuyển slide (ms)
    });
  });