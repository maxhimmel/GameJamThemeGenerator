export class ThemeDatum
{
    private themeName: string = "Theme";

    public constructor( themeName: string )
    {
        this.themeName = themeName;
    }

    public GetThemeName(): string
    {
        return this.themeName;
    }
}