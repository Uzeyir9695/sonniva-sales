<?php

// Generates the translated categories.json for `php artisan localize:import`.
// code => [en, ru, tr]  (empty string = leave for review)

$t = [
    // ── Level 1 ────────────────────────────────────────────────
    '6100' => ['Air fresheners', 'Ароматизаторы', 'Oda kokuları'],
    '6200' => ['Miscellaneous', 'Разное', 'Diğer ürünler'],
    '6300' => ['Services', 'Услуги', 'Hizmetler'],
    '6400' => ['Membrane door fronts', 'Мембранные фасады', 'Membran kapaklar'],

    // ── 1100 Furniture mechanisms ─────────────────────────────
    '1101' => ['Cabinet hinges', 'Мебельные петли', 'Mobilya menteşeleri'],
    '1102' => ['Drawer slides', 'Направляющие для ящиков', 'Çekmece rayları'],
    '1103' => ['Tandem boxes', 'Тандембоксы', 'Tandem kutu sistemleri'],
    '1104' => ['Lift-up door mechanisms', 'Подъёмные механизмы для фасадов', 'Kalkar kapak mekanizmaları'],
    '1105' => ['Bed mechanisms', 'Механизмы для кроватей', 'Yatak mekanizmaları'],
    '1106' => ['Table mechanisms', 'Механизмы для столов', 'Masa mekanizmaları'],
    '1107' => ['Wardrobe systems', 'Гардеробные системы', 'Gardırop sistemleri'],
    '1108' => ['Sofa mechanisms', 'Диванные механизмы', 'Kanepe mekanizmaları'],
    '1109' => ['Door mechanisms', 'Дверные механизмы', 'Kapı mekanizmaları'],
    '1110' => ['Door dampers', 'Мебельные амортизаторы', 'Kapak amortisörleri'],

    // ── 1200 Furniture materials & accessories ────────────────
    '1201' => ['Kitchen fittings & accessories', 'Кухонная фурнитура и аксессуары', 'Mutfak malzemeleri ve aksesuarları'],
    '1202' => ['Cabinet front accessories', 'Аксессуары для фасадов', 'Kapak aksesuarları'],
    '1203' => ['Furniture legs', 'Мебельные ножки', 'Mobilya ayakları'],
    '1204' => ['Furniture casters', 'Мебельные ролики', 'Mobilya tekerlekleri'],
    '1205' => ['Shelf supports & accessories', 'Полкодержатели и аксессуары', 'Raf aksesuarları'],
    '1206' => ['Furniture connectors', 'Мебельные стяжки', 'Mobilya bağlantı elemanları'],
    '1207' => ['Furniture locks', 'Мебельные замки', 'Mobilya kilitleri'],
    '1208' => ['Bed fittings', 'Аксессуары для кроватей', 'Yatak aksesuarları'],

    // ── 1300 Edge banding ────────────────────────────────────
    '1300-01' => ['PVC edge banding', 'Кромка ПВХ', 'PVC kenar bandı'],
    '1300-02' => ['Melamine edge banding', 'Меламиновая кромка', 'Melamin kenar bandı'],

    // ── 1400 Aluminium profiles ──────────────────────────────
    '1401' => ['Aluminium handle profiles', 'Алюминиевые профили-ручки', 'Alüminyum kulp profilleri'],
    '1402' => ['Aluminium tracks', 'Алюминиевые направляющие', 'Alüminyum ray profilleri'],
    '1403' => ['Aluminium strips', 'Алюминиевые полосы', 'Alüminyum lama'],
    '1404' => ['Aluminium angle profiles', 'Алюминиевые уголки', 'Alüminyum köşe profilleri'],
    '1405' => ['Aluminium insert profiles', 'Алюминиевые вставные профили', 'Alüminyum iç dolgu profilleri'],
    '1406' => ['Aluminium kitchen trim strips', 'Алюминиевые планки для кухни', 'Mutfak için alüminyum profil'],
    '1407' => ['Aluminium perpendicular profiles', 'Алюминиевые перпендикулярные профили', 'Alüminyum dik bağlantı profilleri'],
    '1408' => ['Aluminium edge trim', 'Алюминиевый кант', 'Alüminyum kenar profili'],
    '1409' => ['Aluminium square tube', 'Алюминиевая профильная труба', 'Alüminyum kutu profil'],
    '1410' => ['Aluminium straight joining profiles', 'Алюминиевые прямые соединительные профили', 'Alüminyum düz birleştirme profilleri'],
    '1411' => ['Handrail baluster infill strips', 'Вставные планки для стоек перил', 'Korkuluk dikmesi dolgu çıtaları'],
    '1412' => ['Aluminium tube', 'Алюминиевая труба', 'Alüminyum boru'],
    '1413' => ['Refrigerator profiles & accessories', 'Профили и аксессуары для холодильников', 'Buzdolabı profilleri ve aksesuarları'],
    '1414' => ['Nickel-plated tube', 'Никелированная труба', 'Nikel kaplama boru'],
    '1415' => ['Rubber seals for aluminium profiles', 'Резиновые уплотнители для алюминиевого профиля', 'Alüminyum profil contaları'],
    '1416' => ['Other profiles', 'Прочие профили', 'Diğer profiller'],
    '1417' => ['Aluminium frame profiles & connectors', 'Алюминиевые профили для рамок и соединители', 'Alüminyum çerçeve profilleri ve bağlantıları'],
    '1418' => ['Fittings & components', 'Комплектующие', 'Tamamlayıcı parçalar'],

    // ── 1500 Railing components ──────────────────────────────
    '1501' => ['Round railing fittings', 'Фурнитура для круглых перил', 'Yuvarlak korkuluk aksesuarları'],
    '1502' => ['Square railing fittings', 'Фурнитура для квадратных перил', 'Kare korkuluk aksesuarları'],
    '1503' => ['Railing glass clamps', 'Стеклодержатели для перил', 'Korkuluk cam tutucuları'],
    '1504' => ['Railing gaskets', 'Уплотнители для перил', 'Korkuluk contaları'],

    // ── 1600 Glass & shower enclosure fittings ───────────────
    '1600-01' => ['Glass', 'Стекло', 'Cam'],
    '1601' => ['Glass door mechanisms', 'Механизмы для стеклянных дверей', 'Cam kapı mekanizmaları'],
    '1602' => ['Glass door handles', 'Ручки для стеклянных дверей', 'Cam kapı kulpları'],
    '1603' => ['Glass clamps & connectors', 'Стеклодержатели и коннекторы', 'Cam tutucu ve bağlantı elemanları'],
    '1604' => ['Glass rails — round & square', 'Трубы и профильные трубы для стекла', 'Cam için boru ve kutu profil'],
    '1605' => ['Toilet cubicle hardware sets', 'Комплекты фурнитуры для туалетных кабин', 'WC kabin donanım setleri'],
    '1606' => ['Glass edge profiles', 'Профиль для кромки стекла', 'Cam kenar profili'],

    // ── 1700 Aluminium sliding-door systems ──────────────────
    '1702' => ['Sliding system mechanisms', 'Механизмы раздвижных систем', 'Sürgü sistemi mekanizmaları'],
    '1704' => ['Glass balcony systems', 'Системы остекления балконов', 'Cam balkon sistemleri'],
    '1705' => ['Door dampers', 'Доводчики для дверей', 'Kapı yavaşlatıcıları'],

    // ── 1800 Consumables & chemicals ─────────────────────────
    '1801' => ['Fixings & fasteners', 'Крепёжные материалы', 'Montaj malzemeleri'],
    '1802' => ['Cabinet front hardware', 'Комплектующие для фасадов', 'Kapak detay parçaları'],
    '1803' => ['Insulation materials', 'Изоляционные материалы', 'Yalıtım malzemeleri'],
    '1804' => ['Paints & varnishes', 'Лаки и краски', 'Boya ve vernik'],
    '1805' => ['Solvents', 'Растворители', 'Tiner ve çözücüler'],
    '1806' => ['Adhesives', 'Клеи', 'Yapıştırıcılar'],
    '1807' => ['Silicone sealants', 'Силиконовые герметики', 'Silikonlar'],
    '1808' => ['Fillers & putty', 'Шпатлёвки', 'Macun ve dolgular'],
    '1809' => ['Antifreeze & screen wash', 'Антифриз и незамерзающая жидкость', 'Antifriz ve cam suyu'],
    '1810' => ['Markers, pencils & correction fluid', 'Маркеры, карандаши и корректоры', 'Marker, kalem ve daksil'],

    // ── 1900 Hand tools & instruments ────────────────────────
    '1901' => ['Measuring tools', 'Измерительный инструмент', 'Ölçü aletleri'],
    '1902' => ['Cutting tools', 'Режущий инструмент', 'Kesim aletleri'],
    '1903' => ['Pliers', 'Плоскогубцы и пассатижи', 'Pense çeşitleri'],
    '1904' => ['Screwdrivers', 'Отвёртки', 'Tornavidalar'],
    '1905' => ['Spanners & wrenches', 'Гаечные ключи', 'Anahtarlar'],
    '1906' => ['Striking tools', 'Ударный ручной инструмент', 'Darbe el aletleri'],
    '1907' => ['Surface finishing tools', 'Инструмент для шлифовки и полировки', 'Yüzey işleme aletleri'],
    '1908' => ['Workwear & safety equipment', 'Спецодежда и средства защиты', 'İş güvenliği ekipmanları'],
    '1909' => ['Welding & soldering tools', 'Инструмент для сварки и пайки', 'Kaynak ve lehim aletleri'],
    '1910' => ['Tool sets', 'Наборы инструментов', 'Alet setleri'],
    '1911' => ['Repair & installation tools', 'Ремонтный и монтажный инструмент', 'Tamir ve montaj aletleri'],
    '1912' => ['Clamps, latches & holders', 'Зажимы, фиксаторы и держатели', 'Kelepçe, mandal ve tutucular'],

    // ── 2000 Power tools & machinery ─────────────────────────
    '2001' => ['Woodworking tools', 'Инструмент для обработки дерева', 'Ahşap işleme aletleri'],
    '2002' => ['Drilling tools', 'Дрели и перфораторы', 'Delme aletleri'],
    '2003' => ['Metalworking tools', 'Инструмент для обработки металла', 'Metal işleme aletleri'],
    '2004' => ['Air tools & equipment', 'Пневмоинструмент и оборудование', 'Havalı aletler ve ekipmanlar'],
    '2005' => ['Machinery & spare parts', 'Станки и запчасти', 'Makineler ve yedek parçalar'],
    '2006' => ['Power tool consumables', 'Расходные материалы для электроинструмента', 'Elektrikli alet sarf malzemeleri'],
    '2007' => ['Batteries & chargers', 'Аккумуляторы и зарядные устройства', 'Piller ve şarj cihazları'],

    // ── 2100 Electrical products ─────────────────────────────
    '2101' => ['LED strip lighting & accessories', 'Светодиодная лента и аксессуары', 'LED şerit aydınlatma ve aksesuarları'],
    '2102' => ['Lighting & electrical accessories', 'Освещение и электроаксессуары', 'Aydınlatma ve elektrik aksesuarları'],

    // ── 2200 Plumbing & sanitary ware ────────────────────────
    '2201' => ['Kitchen', 'Для кухни', 'Mutfak'],
    '2202' => ['Bathroom', 'Для ванной', 'Banyo'],
    '2203' => ['Plumbing accessories', 'Сантехнические аксессуары', 'Tesisat aksesuarları'],

    // ── 2300 Home ────────────────────────────────────────────
    '2300-01' => ['Furniture', 'Мебель', 'Mobilya'],
    '2300-02' => ['Smart door locks', 'Умные дверные замки', 'Akıllı kapı kilitleri'],
    '2300-03' => ['Appliances & accessories', 'Техника и аксессуары', 'Cihazlar ve aksesuarlar'],
    '2300-04' => ['Decorative wall panels', 'Декоративные стеновые панели', 'Dekoratif duvar panelleri'],
    '2300-05' => ['Door stops & dampers', 'Дверные ограничители и доводчики', 'Kapı stoperleri ve yavaşlatıcıları'],

    // ── 1201 Kitchen fittings (level 3) ──────────────────────
    '1201-01' => ['Plate racks', 'Сушилки для посуды', 'Bulaşık süzgeçleri'],
    '1201-02' => ['Bottle holders', 'Держатели для бутылок', 'Şişelikler'],
    '1201-03' => ['Waste bins', 'Мусорные ведра', 'Çöp kovaları'],
    '1201-04' => ['Stemware holders', 'Держатели для бокалов', 'Kadeh askıları'],
    '1201-05' => ['Kitchen plinths', 'Кухонные цоколи', 'Mutfak süpürgelikleri'],
    '1201-07' => ['Kitchen plinth accessories', 'Комплектующие для кухонных цоколей', 'Mutfak süpürgelik aksesuarları'],
    '1201-08' => ['Kitchen worktops', 'Кухонные столешницы', 'Mutfak tezgâhları'],
    '1201-09' => ['Worktop accessories', 'Аксессуары для столешниц', 'Tezgâh aksesuarları'],
    '1201-10' => ['Kitchen base units', 'Кухонные базы', 'Mutfak alt modülleri'],
    '1201-12' => ['Cutlery trays', 'Лотки для столовых приборов', 'Çatal-bıçak bölmeleri'],

    // ── 1202 Cabinet front accessories (level 3) ─────────────
    '1202-01' => ['Furniture handles', 'Мебельные ручки', 'Mobilya kulpları'],
    '1202-02' => ['Furniture hooks', 'Мебельные крючки', 'Mobilya askıları'],
    '1202-03' => ['Plastic decorative trim', 'Пластиковый декор', 'Plastik dekor'],
    '1202-04' => ['Decorative upholstery nails', 'Декоративные гвозди', 'Dekoratif kabara çivileri'],
    '1202-05' => ['Decorative cane webbing', 'Декоративное ротанговое полотно', 'Dekoratif rattan örgü'],

    // ── 1203 Furniture legs (level 3) ────────────────────────
    '1203-01' => ['Standard furniture legs', 'Стандартные мебельные ножки', 'Standart mobilya ayakları'],
    '1203-02' => ['Upholstered furniture legs', 'Ножки для мягкой мебели', 'Döşemeli mobilya ayakları'],
    '1203-03' => ['Table legs', 'Ножки для столов', 'Masa ayakları'],
    '1203-04' => ['Furniture glides', 'Мебельные подпятники', 'Mobilya pabuçları'],

    // ── 1205 Shelf supports (level 3) ────────────────────────
    '1205-01' => ['Decorative brackets', 'Декоративные уголки', 'Dekoratif köşebentler'],
    '1205-02' => ['Shelf brackets', 'Полкодержатели', 'Raf tutucuları'],
    '1205-03' => ['Glass shelf supports', 'Держатели для стеклянных полок', 'Cam raf tutucuları'],

    // ── 1206 Furniture connectors (level 3) ──────────────────
    '1206-01' => ['Connectors & brackets', 'Стяжки и уголки', 'Bağlantı elemanları ve köşebentler'],
    '1206-02' => ['Butterfly connectors', 'Стяжки «бабочка»', 'Kelebek bağlantılar'],
    '1206-03' => ['Table connectors', 'Стяжки для столов', 'Masa bağlantı elemanları'],

    // ── 1207 Furniture locks (level 3) ───────────────────────
    '1207-01' => ['Locks for laminate doors', 'Замки для ламинированных фасадов', 'Laminat kapak kilitleri'],
    '1207-02' => ['Glass door locks', 'Замки для стеклянных дверей', 'Cam kapak kilitleri'],
    '1207-03' => ['Door hardware', 'Дверная фурнитура', 'Kapı aksesuarları'],

    // ── 1501 Round railing fittings (level 3) ────────────────
    '1501-01' => ['Handrail tubes & rails', 'Трубы и поручни для перил', 'Korkuluk borusu ve küpeştesi'],
    '1501-02' => ['Wall brackets for tubes', 'Настенные крепления для труб', 'Boru duvar bağlantıları'],
    '1501-03' => ['Tube connectors & adapters', 'Держатели и переходники для труб', 'Boru tutucu ve geçiş bağlantıları'],
    '1501-04' => ['Tube bends', 'Отводы для труб', 'Boru dirsekleri'],
    '1501-05' => ['Tube joiners', 'Соединители для труб', 'Boru ekleme parçaları'],
    '1501-06' => ['Tube end caps', 'Заглушки для труб', 'Boru kapakları'],

    // ── 1502 Square railing fittings (level 3) ───────────────
    '1502-01' => ['Square handrail tubes', 'Профильные трубы для перил', 'Korkuluk kutu profili'],
    '1502-02' => ['Wall brackets for square tubes', 'Настенные крепления для профильной трубы', 'Kutu profil duvar bağlantıları'],
    '1502-03' => ['Square tube connectors & adapters', 'Держатели и переходники для профильной трубы', 'Kutu profil tutucu ve geçiş parçaları'],
    '1502-04' => ['Square tube bends', 'Отводы для профильной трубы', 'Kutu profil dirsekleri'],
    '1502-05' => ['Square tube joiners', 'Соединители для профильной трубы', 'Kutu profil ekleme parçaları'],
    '1502-06' => ['Square tube end caps', 'Заглушки для профильной трубы', 'Kutu profil kapakları'],

    // ── 1503 Railing glass clamps (level 3) ──────────────────
    '1503-01' => ['Base glass clamps', 'Нижние стеклодержатели', 'Taban cam bağlantıları'],
    '1503-02' => ['Glass-to-wall fittings (spider)', 'Крепления стекло-стена (спайдер)', 'Cam-duvar bağlantısı (spider)'],
    '1503-03' => ['Glass clamping profiles', 'Профили для крепления стекла', 'Cam tutucu profiller'],
    '1503-04' => ['End caps for glass clamping profiles', 'Заглушки для профилей крепления стекла', 'Cam tutucu profil kapakları'],

    // ── 1601 Glass door mechanisms (level 3) ─────────────────
    '1601-01' => ['Glass door hinges', 'Петли для стеклянных дверей', 'Cam kapı menteşeleri'],
    '1601-02' => ['Sliding door systems', 'Системы раздвижных дверей', 'Sürgülü kapı sistemleri'],
    '1601-03' => ['Glass door locks', 'Замки для стеклянных дверей', 'Cam kapı kilitleri'],
    '1601-04' => ['Glass door mechanisms', 'Механизмы для стеклянных дверей', 'Cam kapı mekanizmaları'],

    // ── 1603 Glass clamps & connectors (level 3) ─────────────
    '1603-01' => ['Glass-to-glass connectors', 'Коннекторы стекло-стекло', 'Cam-cam bağlantıları'],
    '1603-02' => ['Glass-to-wall connectors', 'Коннекторы стекло-стена', 'Cam-duvar bağlantıları'],
    '1603-03' => ['Glass guide channels', 'Направляющие для стекла', 'Cam kılavuz profilleri'],
    '1603-04' => ['UV-bonded glass fittings', 'УФ-склеиваемые крепления для стекла', 'UV yapıştırmalı cam bağlantıları'],
    '1603-05' => ['UV glass adhesive curing lamps', 'УФ-лампы для отверждения клея', 'Cam yapıştırıcı UV kurutma lambaları'],

    // ── 1604 Glass rails (level 3) ───────────────────────────
    '1604-01' => ['Glass rail tubes', 'Трубы для стекла', 'Cam borusu'],
    '1604-02' => ['Glass tube adapters', 'Переходники для труб', 'Cam boru geçiş parçaları'],
    '1604-03' => ['Glass square tubes', 'Профильные трубы для стекла', 'Cam kutu profil'],
    '1604-04' => ['Glass square tube adapters', 'Переходники для профильных труб', 'Cam kutu profil geçiş parçaları'],

    // ── 1801 Fixings & fasteners (level 3) ───────────────────
    '1801-01' => ['Screws', 'Саморезы и шурупы', 'Vidalar'],
    '1801-03' => ['Bolts & nuts', 'Болты и гайки', 'Cıvata ve somunlar'],
    '1801-04' => ['Nails', 'Гвозди', 'Çiviler'],
    '1801-05' => ['Dowel pins', 'Шканты', 'Kavelalar'],
    '1801-06' => ['Wall plugs', 'Дюбели', 'Dübeller'],
    '1801-07' => ['Minifix connectors', 'Стяжки минификс', 'Minifix bağlantı elemanları'],
    '1801-08' => ['Hooks', 'Крючки', 'Kancalar'],
    '1801-09' => ['Hose clamps', 'Хомуты', 'Kelepçeler'],
    '1801-10' => ['Anchor bolts', 'Анкерные крепления', 'Ankraj bağlantıları'],
    '1801-11' => ['Pipe clamps & connectors', 'Держатели и переходники для труб', 'Boru kelepçe ve bağlantıları'],

    // ── 1802 Cabinet front hardware (level 3) ────────────────
    '1802-01' => ['Screw caps', 'Заглушки для саморезов', 'Vida kapakları'],
    '1802-04' => ['Elastic tape', 'Эластичная лента', 'Elastik bant'],
    '1802-05' => ['Felt pads', 'Фетровые накладки', 'Keçe pedler'],
    '1802-06' => ['Sound-dampening pads', 'Демпферы (антишум)', 'Ses yalıtım pedleri'],
    '1802-07' => ['Door seals', 'Уплотнители для дверей', 'Kapı contaları'],
    '1802-08' => ['Edge trim', 'Кант', 'Kenar profili'],
    '1802-09' => ['Plugs & caps', 'Заглушки', 'Tapalar'],
    '1802-10' => ['Fixing clips', 'Крепёжные клипсы', 'Montaj klipsleri'],

    // ── 1803 Insulation materials (level 3) ──────────────────
    '1803-01' => ['Self-adhesive tape', 'Самоклеящаяся лента', 'Kendinden yapışkanlı bant'],
    '1803-02' => ['Packaging film', 'Упаковочная плёнка', 'Ambalaj filmi'],
    '1803-03' => ['Insulating tape', 'Изоляционная лента', 'İzole bant'],
    '1803-04' => ['Pipe insulation', 'Изоляция для труб', 'Boru yalıtımı'],

    // ── 1804 Paints & varnishes (level 3) ────────────────────
    '1804-01' => ['Paint', 'Краска', 'Boya'],
    '1804-02' => ['Primer', 'Грунтовка', 'Astar'],
    '1804-03' => ['Varnish', 'Лак', 'Vernik'],
    '1804-04' => ['Decorative plaster', 'Декоративная штукатурка', 'Dekoratif sıva'],
    '1804-05' => ['Spray guns', 'Краскопульты', 'Boya tabancaları'],

    // ── 1806 Adhesives (level 3) ─────────────────────────────
    '1806-01' => ['Edge banding adhesive', 'Клей для кромкооблицовки', 'Kenar bandı yapıştırıcısı'],
    '1806-02' => ['MDF adhesive', 'Клей для МДФ', 'MDF yapıştırıcısı'],
    '1806-03' => ['Wood glue', 'Столярный клей', 'Ahşap tutkalı'],
    '1806-04' => ['Construction adhesive', 'Монтажный клей', 'Montaj yapıştırıcısı'],
    '1806-05' => ['Contact adhesive', 'Клей для поролона', 'Kontak yapıştırıcı'],
    '1806-06' => ['Polyurethane foam & sealant', 'Полиуретановая пена и мастика', 'Poliüretan köpük ve mastik'],
    '1806-07' => ['Stone & granite adhesive', 'Клей для камня и гранита', 'Granit yapıştırıcısı'],
    '1806-08' => ['Glass adhesive', 'Клей для стекла', 'Cam yapıştırıcısı'],

    // ── 1807 Silicone sealants (level 3) ─────────────────────
    '1807-01' => ['Universal silicone', 'Универсальный силикон', 'Üniversal silikon'],
    '1807-02' => ['Mirror silicone', 'Силикон для зеркал', 'Ayna silikonu'],
    '1807-03' => ['Aquarium silicone', 'Аквариумный силикон', 'Akvaryum silikonu'],
    '1807-04' => ['Roofing silicone', 'Кровельный силикон', 'Çatı silikonu'],
    '1807-05' => ['Hot-melt glue sticks', 'Клеевые стержни', 'Silikon çubuklar'],
    '1807-06' => ['Liquid nails', 'Жидкие гвозди', 'Sıvı çivi'],
    '1807-07' => ['Sealant', 'Герметик', 'Sızdırmazlık macunu'],
    '1807-08' => ['Acrylic sealant', 'Акриловый герметик', 'Akrilik mastik'],
    '1807-09' => ['Anti-mould silicone', 'Антибактериальный силикон', 'Antibakteriyel silikon'],

    // ── 1901 Measuring tools (level 3) ───────────────────────
    '1901-01' => ['Rulers', 'Линейки', 'Cetveller'],
    '1901-02' => ['Squares', 'Угольники', 'Gönyeler'],
    '1901-03' => ['Tape measures', 'Рулетки', 'Şeritmetreler'],
    '1901-04' => ['Calipers', 'Штангенциркули', 'Kumpaslar'],
    '1901-05' => ['Spirit levels', 'Уровни', 'Su terazileri'],
    '1901-06' => ['Digital measuring tools', 'Цифровые измерительные приборы', 'Dijital ölçüm aletleri'],
    '1901-07' => ['Voltage testers', 'Индикаторы напряжения', 'Faz kalemleri'],

    // ── 1902 Cutting tools (level 3) ─────────────────────────
    '1902-01' => ['Utility knives', 'Канцелярские ножи', 'Maket bıçakları'],
    '1902-02' => ['Utility knife blades', 'Сменные лезвия для ножей', 'Maket bıçağı yedek ağızları'],
    '1902-03' => ['Multi-tools', 'Многофункциональные ножи', 'Çok amaçlı bıçaklar'],
    '1902-04' => ['Hand saws', 'Ручные пилы', 'El testereleri'],
    '1902-05' => ['Shears & pruners', 'Ножницы и секаторы', 'Makas ve budama makasları'],
    '1902-06' => ['Saw blades', 'Сменные полотна для пил', 'Testere ağızları'],
    '1902-07' => ['Glass & plastic cutters', 'Стеклорезы и резаки для пластика', 'Cam ve plastik kesiciler'],
    '1902-08' => ['Edge banding trimmers', 'Обрезчики кромки', 'Kenar bandı kesme aletleri'],

    // ── 1903 Pliers (level 3) ────────────────────────────────
    '1903-01' => ['Standard pliers', 'Стандартные плоскогубцы', 'Standart penseler'],
    '1903-02' => ['Long-nose pliers', 'Длинногубцы', 'Kargaburun penseler'],
    '1903-03' => ['Cutting pliers', 'Кусачки', 'Yan keskiler'],
    '1903-04' => ["Carpenter's pincers", 'Клещи столярные', 'Marangoz kerpetenleri'],
    '1903-05' => ['Adjustable pliers', 'Переставные плоскогубцы', 'Ayarlı penseler'],
    '1903-06' => ['Wire strippers', 'Съёмники изоляции', 'Kablo soyucular'],

    // ── 1904 Screwdrivers (level 3) ──────────────────────────
    '1904-01' => ['Standard screwdrivers', 'Стандартные отвёртки', 'Standart tornavidalar'],
    '1904-02' => ['Multi-bit screwdrivers', 'Отвёртки со сменными битами', 'Çok uçlu tornavidalar'],
    '1904-03' => ['Screwdriver bit sets', 'Наборы бит для отвёрток', 'Tornavida uç setleri'],
    '1904-05' => ['Screwdriver bits', 'Биты для отвёрток', 'Tornavida uçları'],

    // ── 1905 Spanners & wrenches (level 3) ───────────────────
    '1905-01' => ['Spanners', 'Гаечные ключи', 'Somun anahtarları'],
    '1905-02' => ['Socket bits', 'Сменные головки', 'Lokma uçları'],
    '1905-03' => ['Spanner sets', 'Наборы гаечных ключей', 'Anahtar setleri'],

    // ── 1906 Striking tools (level 3) ────────────────────────
    '1906-01' => ['Hammers', 'Молотки', 'Çekiçler'],
    '1906-03' => ['Cutting chisels', 'Просечки', 'Kesici keskiler'],
    '1906-04' => ['Chisels', 'Стамески и зубила', 'Keskiler'],
    '1906-05' => ['Axes', 'Топоры', 'Baltalar'],
    '1906-06' => ['Nail pullers & pry bars', 'Гвоздодёры', 'Kaz ayağı ve levyeler'],

    // ── 1907 Surface finishing tools (level 3) ───────────────
    '1907-01' => ['Wire brushes', 'Щётки', 'Teller fırçalar'],
    '1907-02' => ['Files', 'Напильники', 'Eğeler'],
    '1907-03' => ['Scrapers & putty knives', 'Скребки и шпатели', 'Kazıyıcılar ve spatulalar'],
    '1907-04' => ['Sanding blocks', 'Ручные шлифовальные бруски', 'El zımparaları'],
    '1907-05' => ['Sharpening stones', 'Точильные камни', 'Bileme taşları'],

    // ── 1908 Workwear & safety (level 3) ─────────────────────
    '1908-01' => ['Work gloves', 'Рабочие перчатки', 'İş eldivenleri'],
    '1908-02' => ['Workwear', 'Спецодежда', 'İş kıyafetleri'],
    '1908-03' => ['Safety footwear', 'Рабочая обувь', 'İş ayakkabıları'],
    '1908-04' => ['Protective equipment', 'Средства защиты', 'Koruyucu ekipmanlar'],
    '1908-05' => ['Tool bags & boxes', 'Сумки и ящики для инструментов', 'Alet çantaları ve kutuları'],

    // ── 1909 Welding & soldering (level 3) ───────────────────
    '1909-01' => ['Welding electrodes', 'Электроды', 'Kaynak elektrotları'],
    '1909-02' => ['Welding wire', 'Сварочная проволока', 'Kaynak teli'],
    '1909-03' => ['Electrode holders', 'Электрододержатели', 'Elektrot pensesi'],
    '1909-04' => ['Soldering irons', 'Паяльники', 'Havyalar'],
    '1909-05' => ['Staple guns', 'Строительные степлеры', 'Zımba tabancaları'],
    '1909-06' => ['Welding consumables', 'Расходные материалы для сварки', 'Kaynak sarf malzemeleri'],

    // ── 1911 Repair & installation tools (level 3) ───────────
    '1911-01' => ['Installation jigs & templates', 'Монтажные шаблоны', 'Montaj şablonları'],
    '1911-02' => ['Ladders', 'Лестницы и стремянки', 'Merdivenler'],
    '1911-03' => ['Caulking & foam guns', 'Пистолеты для герметика и пены', 'Silikon ve köpük tabancaları'],
    '1911-04' => ['Painting tools', 'Малярный инструмент', 'Boya aletleri'],
    '1911-05' => ['Plastering tools', 'Штукатурный инструмент', 'Sıva aletleri'],

    // ── 1912 Clamps, latches & holders (level 3) ─────────────
    '1912-01' => ['Bar clamps', 'Струбцины', 'İşkenceler'],
    '1912-02' => ['Ratchet tie-down straps', 'Стяжные ремни', 'Gergi kayışları'],
    '1912-03' => ['Rope & cable', 'Верёвки и тросы', 'İp ve halat'],
    '1912-04' => ['Padlocks', 'Навесные замки', 'Asma kilitler'],
    '1912-05' => ['Glass & panel clamps', 'Держатели для стекла и ламината', 'Cam ve panel tutucular'],
    '1912-06' => ['Mini hooks', 'Миниатюрные подвесы', 'Mini askılar'],

    // ── 2001 Woodworking tools (level 3) ─────────────────────
    '2001-01' => ['Jigsaws', 'Электролобзики', 'Dekupaj testereleri'],
    '2001-02' => ['Electric saws', 'Электропилы', 'Elektrikli testereler'],
    '2001-04' => ['Routers', 'Фрезеры', 'Frezeler'],
    '2001-05' => ['Sanders', 'Шлифмашины', 'Zımpara makineleri'],

    // ── 2002 Drilling tools (level 3) ────────────────────────
    '2002-01' => ['Cordless drills', 'Шуруповёрты', 'Vidalama makineleri'],
    '2002-02' => ['Rotary hammers', 'Перфораторы', 'Kırıcı deliciler'],
    '2002-03' => ['Drills', 'Дрели', 'Matkaplar'],

    // ── 2003 Metalworking tools (level 3) ────────────────────
    '2003-01' => ['Angle grinders', 'Углошлифовальные машины', 'Avuç taşlama makineleri'],
    '2003-02' => ['Welding machines', 'Сварочные аппараты', 'Kaynak makineleri'],

    // ── 2004 Air tools & equipment (level 3) ─────────────────
    '2004-01' => ['Air compressors', 'Компрессоры', 'Hava kompresörleri'],
    '2004-03' => ['Heat guns', 'Строительные фены', 'Sıcak hava tabancaları'],
    '2004-04' => ['Air blowers', 'Воздуходувки', 'Üfleyiciler'],
    '2004-05' => ['Spray guns', 'Краскопульты', 'Boya tabancaları'],
    '2004-06' => ['Pneumatic tools', 'Пневмоинструмент', 'Havalı aletler'],
    '2004-07' => ['Vacuum cleaners', 'Строительные пылесосы', 'Elektrikli süpürgeler'],

    // ── 2006 Power tool consumables (level 3) ────────────────
    '2006-01' => ['Screwdriver bits', 'Биты', 'Tornavida uçları'],
    '2006-02' => ['Cutting discs', 'Отрезные диски', 'Kesme diskleri'],
    '2006-03' => ['Polishing discs', 'Полировальные диски', 'Polisaj diskleri'],
    '2006-04' => ['Circular saw blades', 'Пильные диски', 'Daire testere ağızları'],
    '2006-05' => ['Drill bits', 'Свёрла', 'Matkap uçları'],
    '2006-06' => ['Router bits', 'Фрезы', 'Freze uçları'],
    '2006-07' => ['Compressor accessories', 'Аксессуары для компрессоров', 'Kompresör aksesuarları'],
    '2006-08' => ['Pneumatic nails & staples', 'Гвозди и скобы для пневмоинструмента', 'Havalı çivi ve zımbalar'],
    '2006-09' => ['Glass drill bits', 'Свёрла по стеклу', 'Cam matkap uçları'],
    '2006-10' => ['Hole saws', 'Коронки', 'Panç uçları'],
    '2006-11' => ['Sanding sheets & discs', 'Шлифовальные листы и круги', 'Zımpara kâğıtları ve diskleri'],
    '2006-12' => ['Chisel bits', 'Зубила для перфоратора', 'Murç uçları'],

    // ── 2101 LED strip lighting (level 3) ────────────────────
    '2101-01' => ['LED strips', 'Светодиодные ленты', 'LED şeritler'],
    '2101-02' => ['LED profiles', 'Профили для светодиодной ленты', 'LED profilleri'],
    '2101-03' => ['Lighting sensors', 'Датчики освещения', 'Aydınlatma sensörleri'],
    '2101-04' => ['Lighting accessories', 'Комплектующие для освещения', 'Aydınlatma bağlantı parçaları'],
    '2101-05' => ['Power supplies', 'Блоки питания', 'Güç kaynakları'],
    '2101-06' => ['Profile end caps & corners', 'Заглушки и углы для профиля', 'Profil kapak ve köşeleri'],
    '2101-07' => ['Lighting remote controls', 'Пульты для освещения', 'Aydınlatma kumandaları'],

    // ── 2102 Lighting & electrical accessories (level 3) ─────
    '2102-01' => ['Sockets', 'Розетки', 'Prizler'],
    '2102-02' => ['Switches', 'Выключатели', 'Anahtarlar'],
    '2102-03' => ['Frames', 'Рамки', 'Çerçeveler'],
    '2102-04' => ['Extension leads', 'Удлинители', 'Uzatma kabloları'],
    '2102-05' => ['Cables & accessories', 'Провода и комплектующие', 'Kablolar ve aksesuarları'],
    '2102-06' => ['Light bulbs', 'Лампы', 'Ampuller'],
    '2102-07' => ['Torches & work lights', 'Фонари', 'El fenerleri'],
    '2102-08' => ['Lamp holders', 'Патроны для ламп', 'Duylar'],
    '2102-09' => ['Plugs', 'Электровилки', 'Fişler'],
    '2102-10' => ['Distribution boards', 'Распределительные щиты', 'Dağıtım panoları'],
    '2102-11' => ['Cable grommets & outlets', 'Кабельные выводы', 'Kablo çıkış grometleri'],
    '2102-12' => ['Voltage stabilisers', 'Стабилизаторы напряжения', 'Voltaj regülatörleri'],

    // ── 2201 Kitchen plumbing (level 3) ──────────────────────
    '2201-01' => ['Kitchen sinks', 'Кухонные мойки', 'Mutfak evyeleri'],
    '2201-02' => ['Sink accessories', 'Аксессуары для моек', 'Evye aksesuarları'],
    '2201-03' => ['Kitchen mixer taps', 'Кухонные смесители', 'Mutfak bataryaları'],
    '2201-04' => ['Cooker hood accessories', 'Аксессуары для вытяжек', 'Davlumbaz aksesuarları'],

    // ── 2202 Bathroom (level 3) ──────────────────────────────
    '2202-01' => ['Bathroom mixer taps', 'Смесители для ванной', 'Banyo bataryaları'],
    '2202-02' => ['Shower heads', 'Душевые лейки', 'Duş başlıkları'],
    '2202-03' => ['Shower hoses', 'Душевые шланги', 'Duş hortumları'],

    // ── 2203 Plumbing accessories (level 3) ──────────────────
    '2203-01' => ['Braided hoses', 'Гибкая подводка', 'Örgülü hortumlar'],
    '2203-02' => ['Shut-off valves', 'Запорные краны', 'Ara musluklar'],
    '2203-03' => ['Ceramic cartridges', 'Керамические картриджи', 'Seramik kartuşlar'],
    '2203-04' => ["Plumber's hemp", 'Сантехнический лён', 'Tesisatçı keteni'],
];

$out = [];
foreach ($t as $code => [$en, $ru, $tr]) {
    $out[$code] = ['source' => '', 'en' => $en, 'ru' => $ru, 'tr' => $tr];
}

$path = getenv('HOME').'/Sites/sonniva-sales/storage/app/private/localization/categories.json';
file_put_contents($path, json_encode($out, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
echo count($out)." entries written to {$path}\n";
