using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;
using todListBackend.Models;
using todListBackend.Services;

namespace todListBackend.Controllers
{

    [ApiController]
    [Route("api/todo/")]
    [ServiceFilter(typeof(TokenValidationFilter))]
    public class TodoController: ControllerBase
    {
        private readonly JwtTokenService _jwtService;

        private readonly TodoService _todoService;

        private readonly string userId;


        public TodoController (TodoService todoService, JwtTokenService jwtTokenService)
        {
            _todoService = todoService;
            _jwtService = jwtTokenService;

            userId = "";

        }


        [HttpGet("get-all-todolists")]
        public async Task<IActionResult> GetAllTodolists()
        {
            try
            {
                //var userId = _jwtService.GetUserIdFromJwt(jwtToken);

                var userId = HttpContext.Items["UserId"] as string;


                var todoList = await _todoService.GetAllTodolists(userId);
                    
                    Console.WriteLine("Aktuelle Todos: " + todoList);

                    return Ok(todoList);
                    //return Ok(new {TodoList = todoList});
            }
            catch (Exception ex)
            {
                return BadRequest(new {Message = "Fehler beim bekommen der Todolists"});
            }

            return BadRequest(new { Message = "Fehler beim bekommen der Todolists" });

        }

       


        [HttpPost("add-todolist")]
        public async Task<IActionResult> AddTodoList([FromBody] TodolistModelFromFrontend todoList)
        {

            
            Console.WriteLine("In Add-Todolistroute");
            
            var (success, message) = await _todoService.AddTodolist(todoList);

            Console.WriteLine("AddTodolist Message: " + message);
            Console.WriteLine("AddTodolist Success: " + success);

            var userId = HttpContext.Items["UserId"] as string;
            

            if (success)
            {

                var allTodoLists = await _todoService.GetAllTodolists(userId);

                return Ok(allTodoLists);
                
            }

            return BadRequest(new {Message = message}); 
            

        }

        [HttpPost("add-todo")]
        public async Task<IActionResult> AddTodoElement([FromBody] TodoModel todo)
        {
            Console.WriteLine("Todo welches hinzugefügt werden soll: " + todo);


            var (success, message) = await _todoService.AddTodo(todo);

            if(success)
            {
                var allTodos = await _todoService.GetTodos(todo.TodolistId);

                return Ok(allTodos);
            }



            return BadRequest(new { Message = message });

        }


        [HttpPost("get-todos")]
        public async Task<IActionResult> GetTodos([FromBody] TodoRequest request)
        {

            var todolistId = request.TodolistId;

            //Console.Write("TodolistId in Get-Todos: " + todolistId);

            var allTodos = await _todoService.GetTodos(todolistId);
            
            Console.WriteLine("All Todos: " + allTodos);

            return Ok(allTodos);
        }

        
    }
}
