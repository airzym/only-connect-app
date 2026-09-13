using OnlyConnect.App.Models;

namespace OnlyConnect.App.Data;

public interface IGameRepository
{
    Game GetGame();
    void SaveGame(Game game);
}

public class GameRepository : IGameRepository
{
    private static Game Game;

    public Game GetGame() => Game;
    public void SaveGame(Game game) => Game = game;
}

