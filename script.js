$(function() {

  var $newToDo = $('#new-todo');
  var $toDoList = $('#todo-list');
  var toDoTemplate = _.template($('#todo-template').html());

  function ToDo(name, desc) {
    this.name = name;
    this.desc = desc;
  }

  ToDo.all = [
    new ToDo('laundry', 'clean clothes'),
    new ToDo('grocery shopping', 'buy food'),
    new ToDo('nap time', 'remember to sleep!')
  ];

  ToDo.prototype.save = function() {
    ToDo.all.push(this);
    console.log(ToDo.all);
  };

  ToDo.prototype.render = function() {
    var $todo = $(toDoTemplate(this));
    this.index = ToDo.all.indexOf(this);
    $todo.attr('data-index', this.index);
    $toDoList.append($todo);
  };

// Underscore //

  _.each(ToDo.all, function (todo, index) {
    todo.render();
  });

  $newToDo.on('submit', function(event) {
    event.preventDefault();
    var toDoName = $('#todo-name').val();
    var toDoDesc = $('#todo-desc').val();
    var toDo = new ToDo(toDoName, toDoDesc);
    toDo.save();
    toDo.render();
    $newToDo[0].reset();
    $('#todo-name').focus();
  });

  $toDoList.on('click', '.todo-text', function() {
    $(this).toggleClass('done');
  });

  $toDoList.on("click", ".delete", function () {
    var $todo = $(this).closest(".todo");
    var index = $todo.attr('data-index');

    ToDo.all.splice(index, 1);
    console.log(ToDo.all);
    $todo.remove();

    $('.todo').each(function(index) {
      $(this).attr('data-index', index);
    });
  });

});