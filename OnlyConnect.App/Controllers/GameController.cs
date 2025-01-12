using Microsoft.AspNetCore.Mvc;
using OnlyConnect.App.Data;
using OnlyConnect.App.Models;

namespace OnlyConnect.App.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GameController : ControllerBase
{
    private readonly IGameRepository _gameRepository;

    public GameController(IGameRepository gameRepository)
    {
        _gameRepository = gameRepository;
    }
    
    [HttpGet]
    public Game Get()
    {
        return _gameRepository.GetGame();
    }
    
    [HttpPost]
    public void Post([FromBody] NewGame newGame)
    {
        var one = new Team(newGame.TeamOne);
        var two = new Team(newGame.TeamTwo);
        var game = new Game(one, two);
        _gameRepository.InsertGame(game);
    }
    
    [HttpPost("currentTeam/{teamId:Guid}")]
    public void CoinToss([FromRoute] Guid teamId)
    {
        var game = _gameRepository.GetGame();
        game.SetCurrentTeam(teamId);
        _gameRepository.SaveGame(game);
    }
}