using Microsoft.AspNetCore.Mvc;
using OnlyConnect.App.Data;

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
    
    [HttpPost("/coinToss")]
    public void CoinToss([FromBody] CoinToss coinToss)
    {
        var game = _gameRepository.GetGame();
        game.SetCoinToss(coinToss);
        _gameRepository.SaveGame(game);
    }
}

public class CoinToss
{
    public Guid WinningTeamId { get; set; }
    public Guid StartingTeamId { get; set; }
}

public class NewGame
{
    public string TeamOne { get; set; }
    public string TeamTwo { get; set; }
}

public record Game
{
    private CoinToss _coinToss;
    public Team TeamOne { get; }
    public Team TeamTwo { get; }

    public Game(Team teamOne, Team teamTwo)
    {
        TeamOne = teamOne;
        TeamTwo = teamTwo;
    }

    public void SetCoinToss(CoinToss coinToss)
    {
        _coinToss = coinToss;
        if (coinToss.StartingTeamId == TeamOne.TeamId)
        {
            TeamOne.CurrentTurn = true;
        }
        else
        {
            TeamTwo.CurrentTurn = true;
        }
    }
}