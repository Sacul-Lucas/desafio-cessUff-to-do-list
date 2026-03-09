import { AppSidebarBody } from "@/core/components/sidebar/AppSidebarBody"
import { AppSidebarCard } from "@/core/components/cards/AppSidebarCard";
import { ThemeDropdown } from "@/core/components/dropdowns/ThemeDropdown"
import appSettingsIcon from "@/assets/icons/settings.svg";

export const Settings = () => {
    return (
        <AppSidebarBody appSidebarTitle="TaskFlow - Configurações" appSidebarIcon={appSettingsIcon} appSidebarBodyStyle="flex-col">
            <div className="mt-8 xl:max-w-[90%]! h-fit w-full flex justify-center align-middle">
                <AppSidebarCard cardTitle="Configurações" cardDescription="Ajuste as opções conforme suas preferências" cardAction={<ThemeDropdown />}>
                    {null}
                </AppSidebarCard>
            </div>
        </AppSidebarBody>
    )
}