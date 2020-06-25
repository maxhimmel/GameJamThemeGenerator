import { rawThemes } from "../assets/themes.json";
import { ThemeDatum } from "./themeDatum";
import { Random } from "./utility/random";

class ThemeDatabase
{
    public readonly ThemeData: { [id: number]: ThemeDatum } = {};
    public readonly ThemeDataCount: number = -1;

    public constructor()
    {
        const numThemes: number = rawThemes.length;
        this.ThemeDataCount = numThemes;

        for ( var idx: number = 0; idx < numThemes; ++idx )
        {
            const theme: string = rawThemes[idx];
            this.ThemeData[idx] = new ThemeDatum( idx, theme );
        }
    }

    public GetThemesByIndices( indices: number[], onLoaded: ( (themes: ThemeDatum[]) => void ) )
    {
        const themes: ThemeDatum[] = new Array( indices.length );
        for ( var idx: number = 0; idx < indices.length; ++idx )
        {
            const themeIdx: number = indices[idx];
            themes[idx] = this.GetThemeByIndex( themeIdx );
        }

        onLoaded( themes );
    }

    public GetRandomThemes( count: number, onLoaded: ( ( themes: ThemeDatum[] ) => void ) )
    {
        const themes: ThemeDatum[] = new Array( count );
        for ( var idx: number = 0; idx < count; ++idx )
        {
            const randIdx: number = Random.Range( 0, this.ThemeDataCount );
            themes[idx] = this.GetThemeByIndex( randIdx );
        }

        onLoaded( themes );
    }

    private GetThemeByIndex( index: number ): ThemeDatum
    {
        if ( index < 0 || index >= this.ThemeDataCount )
        {
            console.error( "ThemeDatabase | Index out of range. Returning an empty theme." );
            return ThemeDatum.Empty;
        }
        
        return this.ThemeData[index];
    }
}

export const themeDatabase: ThemeDatabase = new ThemeDatabase();