import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const locales = [
    "ja-JP", "en-US", "zh-CN"
];

function getFlagSrc(countryCode) {
    return /^[A-Z]{2}$/.test(countryCode)
        ? `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`
        : "";
}

const LanguageDropdown = () => {
    const [selectedLocale, setSelectedLocale] = useState(locales[1]);
    const { i18n } = useTranslation();

    useEffect(() => {
        const browserLang = new Intl.Locale(navigator.language).language;
        const matchingLocale = locales.find(locale => new Intl.Locale(locale).language === browserLang);
        if (matchingLocale) {
            setSelectedLocale(matchingLocale);
        }
    }, []);

    const handleLocaleChange = (locale) => {
        (locale === 'ja-JP') ? i18n.changeLanguage('jap') : (locale === 'en-Us') ? i18n.changeLanguage('en') : i18n.changeLanguage('zh');
        setSelectedLocale(locale);
    };

    const intlLocale = new Intl.Locale(selectedLocale);
    const langName = new Intl.DisplayNames([selectedLocale], { type: "language" }).of(intlLocale.language);
    const otherLocales = locales.filter(loc => loc !== selectedLocale);

    return (
        <div className="dropdown z-50" tab-index="0">
            <button id="dropdown-btn">
                <img src={getFlagSrc(intlLocale.region)} alt="" />
                {langName}
                <span className="arrow-down"></span>
            </button>
            <ul id="dropdown-content" className="dropdown-content">
                {otherLocales.map(otherLocale => {
                    const otherIntlLocale = new Intl.Locale(otherLocale);
                    const otherLangName = new Intl.DisplayNames([otherLocale], { type: "language" }).of(otherIntlLocale.language);
                    return (
                        <li key={otherLocale} value={otherLocale} onMouseDown={() => handleLocaleChange(otherLocale)}>
                            {otherLangName}
                            <img src={getFlagSrc(otherIntlLocale.region)} alt="" />

                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default LanguageDropdown;


