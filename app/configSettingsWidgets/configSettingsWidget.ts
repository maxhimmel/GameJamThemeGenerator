import { ConfigSettingsDatum } from "../configSettingsDatum";
import { gameJamState } from "../appState/gameJamState";

export class ConfigSettingsWidget
{
    private settingsContainer: HTMLDivElement;
    private entryCount: number = 0;

    public constructor( settingsData: ConfigSettingsDatum )
    {
        this.entryCount = settingsData.defaultEntryCount;
        this.settingsContainer = document.getElementById( "settingsContainer" ) as HTMLDivElement;

        this.CreateEntryCountButtons( settingsData );

        const confirmButton: HTMLButtonElement = document.getElementById( "confirmConfigSettingsButton" ) as HTMLButtonElement;
        confirmButton.addEventListener( "click", this.OnSettingsConfirmed );

        gameJamState.OnThemesGeneratedEvent.Subscribe( this.OnThemesGenerated );
    }

    private CreateEntryCountButtons( settingsData: ConfigSettingsDatum )
    {
        const entryOptionsLayout: HTMLDivElement = document.getElementById( "entryOptionsLayout" ) as HTMLDivElement;

        for ( var idx: number = 0; idx < settingsData.entryOptions.length; ++idx )
        {
            const entryCount = settingsData.entryOptions[idx];

            const newEntryElement: HTMLElement = this.CreateEntryCountButton( entryCount );
            entryOptionsLayout.appendChild( newEntryElement );

            if ( entryCount == settingsData.defaultEntryCount )
            {
                this.SelectDefaultEntryElement( newEntryElement );
            }
        }
    }

    private CreateEntryCountButton( entryCount: number ) : HTMLElement
    {
        const buttonContainer: HTMLLabelElement = document.createElement( "label" );
        buttonContainer.classList.add( "btn", "btn-success" );

        // Why must this input tag be created this way?!
        buttonContainer.innerHTML = "<input type=\"radio\" name=\"entryCountOptions\" autocomplete=\"off\">";
        buttonContainer.innerHTML += entryCount;
        buttonContainer.addEventListener( "click", this.OnEntryCountOptionClicked );

        return buttonContainer;
    }

    private OnEntryCountOptionClicked = ( event: MouseEvent ) =>
    {
        // Prevent this from cascading down into our weirdo <input> tag ...
        event.preventDefault();

        const entryInput: HTMLElement = event.target as HTMLElement;
        const entryCount: number = parseInt( entryInput.innerText );

        this.entryCount = entryCount;
        console.log( entryCount );
    }

    private SelectDefaultEntryElement( entryElement: HTMLElement )
    {
        const inputElement: HTMLInputElement = entryElement.firstChild as HTMLInputElement;
        inputElement.checked = true;

        entryElement.classList.add( "active" );
    }

    private OnSettingsConfirmed = ( event: MouseEvent ) =>
    {
        gameJamState.GenerateThemes( this.entryCount );
    }

    private OnThemesGenerated = () =>
    {
        this.Hide();
    }

    public Hide()
    {
        this.settingsContainer.classList.add( "d-none" );
    }

    public Show()
    {
        this.settingsContainer.classList.remove( "d-none" );
    }
}