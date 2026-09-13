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
        _gameRepository.SaveGame(game);
    }
    
    [HttpPut]
    public Game Put([FromBody] Game game)
    {
        _gameRepository.SaveGame(game);
        return _gameRepository.GetGame();
    }
    
    [HttpPost("currentTeam/{teamId:Guid}")]
    public void CoinToss([FromRoute] Guid teamId)
    {
        var game = _gameRepository.GetGame();
        game.SetCurrentTeam(teamId);
        _gameRepository.SaveGame(game);
    }
    
    [HttpGet("connections/{icon}")]
    public IConnection? Connection([FromRoute] string icon)
    {
        var game = _gameRepository.GetGame();
        return game.Connections.SingleOrDefault(c => c.Name == icon);
    }
    
    [HttpPut("connections/{icon}/winner")]
    public Winner Connection([FromRoute] string icon, [FromBody] Winner winner)
    {
        var game = _gameRepository.GetGame();
        foreach (var connection in game.Connections)
        {
            if (connection.Name == icon)
            {
                connection.SetWinner(winner);
            }
        }
        _gameRepository.SaveGame(game);
        return winner;
    }
    
    
}