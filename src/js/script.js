$(document).ready(function () {
  // MAP BLOCKS //

  //Choose block
  $(".js-map-tab").click(function () {
    $(".js-map-tab").removeClass('hover');
    $(this).addClass('hover');
    $('div[data-sector]').hide();
    $('div[data-sector=' + $(this).attr('data-show-sector') + ']').show();
  });

  // //When changed cc in the form
  // $('[name="cc"]').change(function () {
  //   let q = $('option:selected').attr('data-attr');
  //   addCalendar(q);
  // });

  // //When clicked button in Description
  // $('.class_selected a').click(function () {
  //   $('option[value="' + $(this).attr('data-validators') + '"]').prop('selected', true);
  //   let w = $('option:selected').attr('data-attr');
  //   addCalendar(w);
  // });

  // function addCalendar(e) {
  //   $('.add-calendar-token').hide();
  //   $('#' + e).show();
  // }

  // CUBES //
  
  let _$cube1 = $(".cube--green-l"),
    _$cube2 = $(".cube--darkgreen-l"),
    _$cube3 = $(".cube--lightblue-l"),
    _$cube4 = $(".cube--blue-l"),
    _$cube5 = $(".cube--darkgreen-r"),
    _$cube6 = $(".cube--green-r"),
    _$cube7 = $(".cube--xgreen-r"),
    _coef1 = 2,
    _coef2 = 3,
    _coef3 = 5,
    _coef4 = 8;

  function simpleParalax(el, coef, scroll) {
    for (let i = 0; i < $(el).length; i++) {
      $(el[i])
        .css("transform", "translateY(" + scroll / ($(el[i])
          .parents(".cubes__bot").length ? -coef : coef) + "px)")
    }
  }
  
  // Cubes animation
  $(window).scroll(function () {
    simpleParalax(_$cube1, _coef4, $(this).scrollTop());
    simpleParalax(_$cube2, _coef3, $(this).scrollTop());
    simpleParalax(_$cube3, _coef2, $(this).scrollTop());
    simpleParalax(_$cube4, _coef1, $(this).scrollTop());
    simpleParalax(_$cube5, _coef4, $(this).scrollTop());
    simpleParalax(_$cube6, _coef3, $(this).scrollTop());
    simpleParalax(_$cube7, _coef3, $(this).scrollTop());
  });

  // $(document)
  //   .on(
  //     "callSuccessProgressiveProfiling callUnsuccessfulProgressiveProfiling",
  //     function () { $(".cubes").addClass("animation-is-on") }
  //   )
});
