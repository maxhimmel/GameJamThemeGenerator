import { ThemeDatum } from "../themeDatum";
import { Action, IEvent } from "../utility/actions";
import { themeDatabase } from "../themeDatabase";
import { TourneyController } from "./tournament/tourneyController";
import { TourneyRound } from "./tournament/tourneyRound";
import { Random } from "../utility/random";

class GameJamState
{
    public get GeneratedThemes(): ReadonlyArray<ThemeDatum> { return Object.values( this.generatedThemes ); }

    public OnPooledThemeContextOpenedEvent: Action<void> = new Action<void>();
    public OnPooledThemeContextClosedEvent: Action<void> = new Action<void>();

    public get OnThemesGeneratedEvent(): IEvent<void> { return this.onThemesGeneratedEvent.AsEvent; }
    private onThemesGeneratedEvent: Action<void> = new Action<void>();

    public get OnRoundEndedEvent(): IEvent<TourneyRound> { return this.onRoundEndedEvent.AsEvent; }
    private onRoundEndedEvent: Action<TourneyRound> = new Action<TourneyRound>();

    public get OnWinnerDeclaredEvent(): IEvent<ThemeDatum> { return this.onWinnerDecalredEvent.AsEvent; }
    private onWinnerDecalredEvent: Action<ThemeDatum> = new Action<ThemeDatum>();

    public get OnThemeReplacedEvent(): IEvent<ThemeDatum> { return this.onThemeReplacedEvent.AsEvent; }
    private onThemeReplacedEvent: Action<ThemeDatum> = new Action<ThemeDatum>();

    private tourneyController: TourneyController | undefined;
    private generatedThemes: { [id: number]: ThemeDatum } = {};

    public GetThemeById( id: number ): ThemeDatum
    {
        var theme: ThemeDatum = this.generatedThemes[id];
        if ( !theme )
        {
            console.error( "GameJamState | Theme ID '" + id + "' not found." );
            return ThemeDatum.Empty;
        }

        return theme;
    }

    public GetRoundProgress(): number 
    {
        return this.tourneyController?.GetRoundProgress() ?? 0;
    }

    public GetCurrentRound(): TourneyRound | undefined
    {
        return this.tourneyController?.GetCurrentRound();
    }

    public DeleteTheme( theme: ThemeDatum )
    {
        console.warn( "GameJamState | TODO: Delete theme (" + theme + ") from profile/database." );

        this.ReplaceTheme( theme );
    }

    public ReplaceTheme( theme: ThemeDatum )
    {
        const randId: number = Random.Range( 0, themeDatabase.ThemeDataCount );
        const newTheme: ThemeDatum = themeDatabase.ThemeData[randId];

        console.log( "Replacement theme: " + newTheme );

        delete this.generatedThemes[theme.Id];
        this.generatedThemes[newTheme.Id] = newTheme;

        this.tourneyController?.ReplaceParticipant( theme.Id, newTheme.Id );

        this.onThemeReplacedEvent.Invoke( theme );
    }

    public SetWinner( round: number, winningTheme: ThemeDatum )
    {
        this.tourneyController?.SetWinner( round, winningTheme.Id );

        const endedRound: TourneyRound | undefined = this.tourneyController?.GetRoundById( round );
        if ( !endedRound ) { return; }

        this.onRoundEndedEvent.Invoke( endedRound );

        const totalRounds: number = this.tourneyController?.TotalRounds ?? 0;
        const isFinalRound: boolean = endedRound.RoundId >= totalRounds;
        if ( isFinalRound )
        {
            console.log( "%cWinner is: " + winningTheme, "color:green" );
            this.onWinnerDecalredEvent.Invoke( winningTheme );
        }
    }

    public GenerateThemes( count: number )
    {
        themeDatabase.GetRandomThemes( count, this.OnThemesGenerated );
    }

    private OnThemesGenerated = ( themes: ThemeDatum[] ) =>
    {
        this.LogGeneratedThemes( themes );

        const themeIds: number[] = new Array( themes.length );

        for ( var idx: number = 0; idx < themes.length; ++idx )
        {
            const theme: ThemeDatum = themes[idx];

            themeIds[idx] = theme.Id;
            this.generatedThemes[theme.Id] = theme;
        }

        this.tourneyController = new TourneyController( themeIds );

        this.onThemesGeneratedEvent.Invoke();
    }

    private LogGeneratedThemes( themes: ThemeDatum[] )
    {
        console.group( "GENERATED THEMES (" + themes.length + ")" );
        console.log( themes );
        console.groupEnd();
    }
}

export const gameJamState: GameJamState = new GameJamState();