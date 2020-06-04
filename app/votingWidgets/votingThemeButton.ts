import { ThemeDatum } from "../themeDatum";

export class VotingThemeButton
{
    private button: HTMLButtonElement;
    private themeData: ThemeDatum;

    public constructor( button: HTMLButtonElement )
    {
        this.button = button;
        button.addEventListener( "click", ( event: MouseEvent ) =>
        {
            console.log( this.themeData );
        } );
    }

    private OnClicked( event: MouseEvent )
    {
        console.log( this.themeData );
    }

    public GetThemeData(): ThemeDatum
    {
        return this.themeData;
    }

    public SetTheme( themeData: ThemeDatum )
    {
        this.themeData = themeData;
        this.button.innerText = themeData.GetThemeName();
    }
}