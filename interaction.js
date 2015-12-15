/**
 * Created by zhoujh on 2015/9/19.
 */

function interaction() {
    $('a.rules.item').click(function() {
        {
            $('.ui.modal.rules').modal('show');
        }
    });

    $('a.about.item').click(function() {
        {
            $('.ui.modal.about').modal('show');
        }
    });

    $('#new-game').click(function() {
        newGame();
    })
}
