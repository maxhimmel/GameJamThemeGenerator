import { gameJamState } from "../appState/gameJamState";
import { ThemeDatum } from "../themeDatum";
import { winMessages } from "../../assets/winningMessages.json";
import { Random } from "../utility/random";

export class WinWidget
{
    private menuContainer: HTMLDivElement;
    private winMessage: HTMLHeadElement;
    private themeElement: HTMLElement;

    public constructor()
    {
        this.menuContainer = document.getElementById( "winContainer" ) as HTMLDivElement;
        this.winMessage = document.getElementById( "winMessage" ) as HTMLHeadElement;
        this.themeElement = document.getElementById( "winningTheme" ) as HTMLElement;

        gameJamState.OnWinnerDeclaredEvent.Subscribe( this.OnWinnerDeclared );
    }

    private OnWinnerDeclared = ( winningTheme: ThemeDatum ) =>
    {
        this.Show();

        this.SetWinningTheme( winningTheme );

        const message: string = this.GetRandomWinningMessage();
        this.SetWinningMessage( message );
    }

    private SetWinningTheme( theme: ThemeDatum )
    {
        this.themeElement.innerText = theme.ThemeName;
    }

    private GetRandomWinningMessage(): string
    {
        const randIdx: number = Random.Range( 0, winMessages.length );
        return winMessages[randIdx];
    }

    private SetWinningMessage( message: string )
    {
        this.winMessage.innerText = message;
    }

    public Hide()
    {
        this.menuContainer.classList.add( "d-none" );
    }

    public Show()
    {
        this.menuContainer.classList.remove( "d-none" );
    }
}