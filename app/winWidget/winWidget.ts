import { gameJamState } from "../appState/gameJamState";
import { ThemeDatum } from "../themeDatum";
import { winMessages } from "../../assets/winningMessages.json";
import { Random } from "../utility/random";

export class WinWidget
{
    private menuContainer: HTMLDivElement;
    private winMessage: HTMLHeadElement;
    private themeElement: HTMLButtonElement;

    public constructor()
    {
        this.menuContainer = document.getElementById( "winContainer" ) as HTMLDivElement;
        this.winMessage = document.getElementById( "winMessage" ) as HTMLHeadElement;
        this.themeElement = document.getElementById( "winningTheme" ) as HTMLButtonElement;

        gameJamState.OnWinnerDeclaredEvent.Subscribe( this.OnWinnerDeclared );

        this.themeElement.addEventListener( "click", this.OnWinningThemeClicked );
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

    private OnWinningThemeClicked = ( event: MouseEvent ) =>
    {
        this.themeElement.classList.add( "bounce" );
        this.themeElement.addEventListener( "animationend", this.OnBounceAnimEnd );
    }

    private OnBounceAnimEnd = ( animeEvent: AnimationEvent ) =>
    {
        this.themeElement.classList.remove( "bounce" );
        this.themeElement.removeEventListener( "animationend", this.OnBounceAnimEnd );
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