using OnlyConnect.App.Controllers;

namespace OnlyConnect.App.Data;

public interface IGameRepository
{
    Game GetGame();
    void InsertGame(Game game);
    void SaveGame(Game game);
}

public class GameRepository : IGameRepository
{
    private static Game Game;

    public Game GetGame() => Game;

    public void InsertGame(Game game) => Game = game;
    public void SaveGame(Game game) => Game = game;
}

