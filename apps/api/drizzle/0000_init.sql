-- Custom SQL migration file, put your code below! --
INSERT INTO
    "job_types" ("job_type_id", "name")
VALUES (
        'bf714521-b003-b0c0-1eeb-9ca10b102406',
        '車両調達担当者'
    ),
    (
        '3af3d477-08b7-88b4-9209-085289b3200e',
        '経理'
    ),
    (
        'af86a3f5-58ea-86e1-89ce-9fcf543428a5',
        '総務'
    ),
    (
        'a126cd31-2c67-c62d-b3db-2a26e59a7d6c',
        '車両調達担当者'
    ),
    (
        '1b77802c-6db4-bf84-3d64-7fee92a6eb93',
        '総務'
    );

INSERT INTO
    "deploy_statuses" ("deploy_status_id", "name")
VALUES (
        '6200ea20-fd84-480e-d887-62b4b3c37876',
        '公開'
    ),
    (
        '3f6f6b72-dbbc-845d-f056-31ca0933d51c',
        '非公開'
    ),
    (
        '5ffd534c-29c6-bca8-47ea-e685bf361e09',
        '公開前'
    ),
    (
        '9c079ce2-11f7-404e-0aac-f6667dbbf349',
        'public2'
    ),
    (
        '805fef9c-39c0-4840-ba2d-77a7b844e476',
        'public2'
    );

INSERT INTO
    "sold_statuses" ("sold_status_id", "name")
VALUES (
        '5e1a6f97-72b8-81fa-2e7d-39cc54d982d4',
        '入札開始前'
    ),
    (
        'a6461049-839c-faac-156b-276391c67b4b',
        '入札受付中'
    ),
    (
        'f3ce59fd-a7d4-7e07-6f7e-e3c2e4b3e1c1',
        '入札終了'
    ),
    (
        '425cc9b0-ad28-4a17-d0ed-7b5c84e961e2',
        '落札確定'
    ),
    (
        'aeed5ffd-d3c6-2bcf-120a-e3f86597c55d',
        '出品取り消し'
    );

INSERT INTO
    manufacturers ("manufacturer_id", "name")
VALUES (
        'ef532ea5-0aaf-b4a8-b93c-2b3e83adb7aa',
        'ホンダ'
    ),
    (
        'a56df6e6-c5c3-eaf6-5b43-eaa5a93735bc',
        'トヨタ'
    ),
    (
        'b10493e4-f656-9db4-7860-e15f4bcb77c0',
        'ダイハツ'
    ),
    (
        '7d2d5fae-6e3f-3e54-12bc-45b5d978b2d0',
        '日産'
    ),
    (
        '4d5b386a-aa75-4242-e870-072e47360f6f',
        'トヨタ'
    );

INSERT INTO
    "series" (
        "series_id",
        "name",
        "manufacturer_id"
    )
VALUES (
        '4b8dd422-f42b-6a62-63fd-4b1d215f6db6',
        'N-BOX',
        'ef532ea5-0aaf-b4a8-b93c-2b3e83adb7aa'
    ),
    (
        '934b41ba-77af-2e6a-b247-4ef8045a752d',
        'プリウス',
        'a56df6e6-c5c3-eaf6-5b43-eaa5a93735bc'
    ),
    (
        '070acf9c-921e-2161-cdf0-1518e2301fb7',
        'タント',
        'b10493e4-f656-9db4-7860-e15f4bcb77c0'
    ),
    (
        '7f335ca3-8c42-3cf0-54f5-0d3eaf3c568f',
        'セレナ',
        '7d2d5fae-6e3f-3e54-12bc-45b5d978b2d0'
    ),
    (
        '3ec04aac-5fef-9dcd-74f6-98be281bbb26',
        'アルファード',
        '4d5b386a-aa75-4242-e870-072e47360f6f'
    );

INSERT INTO
    "employees" (
        "employee_id",
        "name",
        "job_type_id"
    )
VALUES (
        'cd6c194b-aecb-8bac-c7cf-ad569ee9d5ea',
        'sample1',
        'bf714521-b003-b0c0-1eeb-9ca10b102406'
    ),
    (
        '2c17a0db-6e8f-46cd-28d4-4b7e2f5ac535',
        'sample2',
        '3af3d477-08b7-88b4-9209-085289b3200e'
    ),
    (
        '311c98c1-a4a7-bd35-47e6-6afd4164f746',
        'sample3',
        'af86a3f5-58ea-86e1-89ce-9fcf543428a5'
    ),
    (
        'd010edab-2d99-5d27-d6a1-db89fabd7657',
        'sample4',
        'a126cd31-2c67-c62d-b3db-2a26e59a7d6c'
    ),
    (
        '2ae3f345-6b17-7171-612d-de2f5a23cd98',
        'sample5',
        '1b77802c-6db4-bf84-3d64-7fee92a6eb93'
    );

INSERT INTO
    "customers" (
        "customer_id",
        "name",
        "email",
        "prefecture",
        "city",
        "address",
        "post_code",
        "password_hash",
        "created_at",
        "updated_at"
    )
VALUES (
        'fdd25989-085e-fc11-31f0-a4a25095a47d',
        '波留太郎',
        'sample1@gmail.com',
        '北海道',
        '札幌市',
        '1-23-4',
        '8931101',
        '9f738ce8457f291b18ee47e665e96baa84f38fcd',
        '2024-11-5 12:00',
        '2024-11-5 12:00'
    ),
    (
        '00c1ca81-8425-de90-9189-997acf91a0f0',
        '波留次郎',
        'sample2@gamil.com',
        '東京',
        '渋谷区',
        '1-23-5',
        '8931102',
        '194e13da720a1f025685e5d677eba8a1aff3860a',
        '2024-11-5 12:00',
        '2024-11-5 12:00'
    ),
    (
        'fcff5871-cff8-a199-fdbb-a8d0864c5143',
        '波留三郎',
        'sample3@gmail.com',
        '愛知',
        '名古屋市',
        '1-23-6',
        '8931103',
        '8b21c0e40c58a1e4b9180e4a293cf37998cf0e1c',
        '2024-11-5 12:00',
        '2024-11-5 12:00'
    ),
    (
        'ac1d4562-801c-ea25-c09d-fbd0838467d9',
        '波留四郎',
        'sample4@gmail.com',
        '大阪',
        '大阪市',
        '1-23-7',
        '8931104',
        '7daf403c7589f4927632ed3b6af762a992f09b78',
        '2024-11-5 12:00',
        '2024-11-5 12:00'
    ),
    (
        '506658a7-9b1b-3b35-5d81-0e616684a744',
        '波留五郎',
        'sample5gmail.com',
        '福岡',
        '博多市',
        '1-23-8',
        '8931105',
        '4f1cef8d900db702b7759ef360430fd6151362a1',
        '2024-11-5 12:00',
        '2024-11-5 12:00'
    );

INSERT INTO
    "vehicles" (
        "vehicle_id",
        "created_at",
        "updated_at",
        "series_id",
        "employee_id"
    )
VALUES (
        'c1ef68d4-4675-49c5-63dc-4adc52284d82',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        '4b8dd422-f42b-6a62-63fd-4b1d215f6db6',
        'cd6c194b-aecb-8bac-c7cf-ad569ee9d5ea'
    ),
    (
        '51553287-933d-8fb9-399a-0af28821d357',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        '934b41ba-77af-2e6a-b247-4ef8045a752d',
        '2c17a0db-6e8f-46cd-28d4-4b7e2f5ac535'
    ),
    (
        '61fa1bab-1109-21da-dc89-8c1c519d1a43',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        '070acf9c-921e-2161-cdf0-1518e2301fb7',
        '311c98c1-a4a7-bd35-47e6-6afd4164f746'
    ),
    (
        '37992583-daca-a449-73d2-cfb80946714a',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        '7f335ca3-8c42-3cf0-54f5-0d3eaf3c568f',
        'd010edab-2d99-5d27-d6a1-db89fabd7657'
    ),
    (
        '614cd781-4e09-1d1f-e039-d9cc15f6af68',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        '3ec04aac-5fef-9dcd-74f6-98be281bbb26',
        '2ae3f345-6b17-7171-612d-de2f5a23cd98'
    );

INSERT INTO
    "auctions" (
        "auction_id",
        "created_at",
        "updated_at",
        "employee_id",
        "duration",
        "begin_time"
    )
VALUES (
        '07c3ce66-bda2-4e10-3752-8665cd96b26d',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        'cd6c194b-aecb-8bac-c7cf-ad569ee9d5ea',
        interval '30 minutes',
        '2024-11-10 12:00'
    ),
    (
        '25003906-2bad-24a9-e3d4-e299f9e40063',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        '2c17a0db-6e8f-46cd-28d4-4b7e2f5ac535',
        interval '30 minutes',
        '2024-11-10 12:00'
    ),
    (
        '8be51f27-11fb-d808-6269-64166e32c855',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        '311c98c1-a4a7-bd35-47e6-6afd4164f746',
        interval '30 minutes',
        '2024-11-10 12:00'
    ),
    (
        '7c06d873-bbbe-c9e5-bf3c-b89089400340',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        'd010edab-2d99-5d27-d6a1-db89fabd7657',
        interval '30 minutes',
        '2024-11-10 12:00'
    ),
    (
        '5f539df0-6706-d72e-95b8-d148c73ce902',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        '2ae3f345-6b17-7171-612d-de2f5a23cd98',
        interval '30 minutes',
        '2024-11-10 12:00'
    );

INSERT INTO
    "stocks" (
        "stock_id",
        "created_at",
        "updated_at",
        "auction_id",
        "vehicle_id",
        "employee_id",
        "sold_status_id",
        "begin_time"
    )
VALUES (
        '7996ba52-eb36-09da-a21a-978e6cae937f',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        '07c3ce66-bda2-4e10-3752-8665cd96b26d',
        'c1ef68d4-4675-49c5-63dc-4adc52284d82',
        'cd6c194b-aecb-8bac-c7cf-ad569ee9d5ea',
        '5e1a6f97-72b8-81fa-2e7d-39cc54d982d4',
        '2024-11-10 12:00'
    ),
    (
        '97775fad-caac-b824-0aa4-bfc2f20e38e4',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        '25003906-2bad-24a9-e3d4-e299f9e40063',
        '51553287-933d-8fb9-399a-0af28821d357',
        '2c17a0db-6e8f-46cd-28d4-4b7e2f5ac535',
        'a6461049-839c-faac-156b-276391c67b4b',
        '2024-11-10 12:00'
    ),
    (
        '86ef2efd-fb56-9a4d-9697-63bf0b39d7de',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        '8be51f27-11fb-d808-6269-64166e32c855',
        '61fa1bab-1109-21da-dc89-8c1c519d1a43',
        '311c98c1-a4a7-bd35-47e6-6afd4164f746',
        'f3ce59fd-a7d4-7e07-6f7e-e3c2e4b3e1c1',
        '2024-11-10 12:00'
    ),
    (
        '5ad4d4e1-fe13-83f5-0091-83495bb135b8',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        '7c06d873-bbbe-c9e5-bf3c-b89089400340',
        '37992583-daca-a449-73d2-cfb80946714a',
        'd010edab-2d99-5d27-d6a1-db89fabd7657',
        '425cc9b0-ad28-4a17-d0ed-7b5c84e961e2',
        '2024-11-10 12:00'
    ),
    (
        '1f58ea45-2896-64c4-9f3d-2bae5048a663',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        '5f539df0-6706-d72e-95b8-d148c73ce902',
        '614cd781-4e09-1d1f-e039-d9cc15f6af68',
        '2ae3f345-6b17-7171-612d-de2f5a23cd98',
        'aeed5ffd-d3c6-2bcf-120a-e3f86597c55d',
        '2024-11-10 12:00'
    );

INSERT INTO
    "images" ("image_id", "url")
VALUES (
        'b1db3622-3162-9a45-1742-44c4e3d9105b',
        'https://auction-stocks.kosuke.dev/P1.png'
    ),
    (
        '75ce8818-153f-51ec-9da0-d760ef15fc21',
        'https://auction-stocks.kosuke.dev/P2.png'
    ),
    (
        '5fc991dc-8b9f-0657-19a3-d22eea9bb6f2',
        'https://auction-stocks.kosuke.dev/P3.png'
    ),
    (
        '0d6a1a07-732e-bc4c-5fb6-a318e398f6ed',
        'https://auction-stocks.kosuke.dev/P4.png'
    ),
    (
        'bac935a0-2d29-0352-bb2c-4b1e5d8b2090',
        'https://auction-stocks.kosuke.dev/P5.png'
    ),
    (
        '8e76fb04-b565-d926-e9c7-3d408bd5fdf9',
        'https://auction-stocks.kosuke.dev/P6.png'
    ),
    (
        'f3724ad6-96a8-bde3-3a6e-52c801de0358',
        'https://auction-stocks.kosuke.dev/P7.png'
    ),
    (
        'f73aef5e-a62e-ee37-aa6b-1fa670f31c99',
        'https://auction-stocks.kosuke.dev/P8.png'
    ),
    (
        'fb519de9-10df-ce32-f40e-15a4ac9de00a',
        'https://auction-stocks.kosuke.dev/P9.png'
    ),
    (
        'fa6d6174-1d28-57e3-0047-03551e7bf9d5',
        'https://auction-stocks.kosuke.dev/P10.png'
    );

INSERT INTO
    "images_stocks" ("image_id", "stock_id")
VALUES (
        'b1db3622-3162-9a45-1742-44c4e3d9105b',
        '97775fad-caac-b824-0aa4-bfc2f20e38e4'
    ),
    (
        '75ce8818-153f-51ec-9da0-d760ef15fc21',
        '97775fad-caac-b824-0aa4-bfc2f20e38e4'
    ),
    (
        '5fc991dc-8b9f-0657-19a3-d22eea9bb6f2',
        '97775fad-caac-b824-0aa4-bfc2f20e38e4'
    ),
    (
        '0d6a1a07-732e-bc4c-5fb6-a318e398f6ed',
        '97775fad-caac-b824-0aa4-bfc2f20e38e4'
    ),
    (
        'bac935a0-2d29-0352-bb2c-4b1e5d8b2090',
        '97775fad-caac-b824-0aa4-bfc2f20e38e4'
    ),
    (
        '8e76fb04-b565-d926-e9c7-3d408bd5fdf9',
        '97775fad-caac-b824-0aa4-bfc2f20e38e4'
    ),
    (
        'f3724ad6-96a8-bde3-3a6e-52c801de0358',
        '97775fad-caac-b824-0aa4-bfc2f20e38e4'
    ),
    (
        'f73aef5e-a62e-ee37-aa6b-1fa670f31c99',
        '97775fad-caac-b824-0aa4-bfc2f20e38e4'
    ),
    (
        'fb519de9-10df-ce32-f40e-15a4ac9de00a',
        '97775fad-caac-b824-0aa4-bfc2f20e38e4'
    ),
    (
        'fa6d6174-1d28-57e3-0047-03551e7bf9d5',
        '97775fad-caac-b824-0aa4-bfc2f20e38e4'
    );

INSERT INTO
    "bids" (
        "bid_id",
        "customer_id",
        "stock_id",
        "price",
        "created_at"
    )
VALUES (
        '3385f099-f1ed-9603-1454-b34fbb828024',
        'fdd25989-085e-fc11-31f0-a4a25095a47d',
        '7996ba52-eb36-09da-a21a-978e6cae937f',
        100000,
        '2024-11-5 12:00'
    ),
    (
        '6c77b771-b74a-1dd8-694e-9dd5b40fc461',
        '00c1ca81-8425-de90-9189-997acf91a0f0',
        '97775fad-caac-b824-0aa4-bfc2f20e38e4',
        200000,
        '2024-11-5 12:00'
    ),
    (
        'c0fd3238-ef83-8ca1-a545-da579d9cfe64',
        'fcff5871-cff8-a199-fdbb-a8d0864c5143',
        '86ef2efd-fb56-9a4d-9697-63bf0b39d7de',
        300000,
        '2024-11-5 12:00'
    ),
    (
        '0ac0ef13-33b9-4d7d-8044-a49edca3ec89',
        'ac1d4562-801c-ea25-c09d-fbd0838467d9',
        '5ad4d4e1-fe13-83f5-0091-83495bb135b8',
        400000,
        '2024-11-5 12:00'
    ),
    (
        '76402870-ee8f-e8df-5dbc-727179443360',
        '506658a7-9b1b-3b35-5d81-0e616684a744',
        '1f58ea45-2896-64c4-9f3d-2bae5048a663',
        500000,
        '2024-11-5 12:00'
    );

INSERT INTO
    "notifications" (
        "notification_id",
        "title",
        "body",
        "created_at",
        "updated_at",
        "employee_id",
        "deploy_schedule",
        "deploy_status_id"
    )
VALUES (
        'e0ad24ca-34d6-5c63-87d4-51ea39a597fe',
        'タイトル1',
        '本文1',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        'cd6c194b-aecb-8bac-c7cf-ad569ee9d5ea',
        '2024-11-5 12:00',
        '6200ea20-fd84-480e-d887-62b4b3c37876'
    ),
    (
        '4dd26aee-d823-a7c0-4f8b-3cab7428dd29',
        'タイトル2',
        '本文2',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        '2c17a0db-6e8f-46cd-28d4-4b7e2f5ac535',
        '2024-11-5 12:00',
        '3f6f6b72-dbbc-845d-f056-31ca0933d51c'
    ),
    (
        '93b2cc4f-af6f-02b4-3c6b-f63d6d3fe6f2',
        'タイトル3',
        '本文3',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        '311c98c1-a4a7-bd35-47e6-6afd4164f746',
        '2024-11-5 12:00',
        '5ffd534c-29c6-bca8-47ea-e685bf361e09'
    ),
    (
        '42402878-df77-9149-01e0-4139080f458c',
        'タイトル4',
        '本文4',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        'd010edab-2d99-5d27-d6a1-db89fabd7657',
        '2024-11-5 12:00',
        '9c079ce2-11f7-404e-0aac-f6667dbbf349'
    ),
    (
        '80eb70cf-1075-c29c-86b1-ed6d0e26dceb',
        'タイトル5',
        '本文5',
        '2024-11-5 12:00',
        '2024-11-5 12:00',
        '2ae3f345-6b17-7171-612d-de2f5a23cd98',
        '2024-11-5 12:00',
        '805fef9c-39c0-4840-ba2d-77a7b844e476'
    );

INSERT INTO
    "contacts" (
        "contact_id",
        "customer_id",
        "title",
        "body",
        "employee_id",
        "created_at",
        "updated_at"
    )
VALUES (
        '097f560d-7685-5ac8-eecb-a717311fc9e2',
        'fdd25989-085e-fc11-31f0-a4a25095a47d',
        'タイトル1',
        '内容1',
        'cd6c194b-aecb-8bac-c7cf-ad569ee9d5ea',
        '2024-11-5 12:00',
        '2024-11-5 12:00'
    ),
    (
        '4ee04815-ebdc-e75a-c8be-b6baf455bb9f',
        '00c1ca81-8425-de90-9189-997acf91a0f0',
        'タイトル2',
        '内容2',
        '2c17a0db-6e8f-46cd-28d4-4b7e2f5ac535',
        '2024-11-5 12:00',
        '2024-11-5 12:00'
    ),
    (
        '101052bb-2485-5146-2476-4f7c895387ac',
        'fcff5871-cff8-a199-fdbb-a8d0864c5143',
        'タイトル3',
        '内容3',
        '311c98c1-a4a7-bd35-47e6-6afd4164f746',
        '2024-11-5 12:00',
        '2024-11-5 12:00'
    ),
    (
        '6034bcc3-a173-1534-1889-01d7b927724a',
        'ac1d4562-801c-ea25-c09d-fbd0838467d9',
        'タイトル4',
        '内容4',
        'd010edab-2d99-5d27-d6a1-db89fabd7657',
        '2024-11-5 12:00',
        '2024-11-5 12:00'
    ),
    (
        '9c85ef35-267d-39e7-ff1d-9bd5700f6fea',
        '506658a7-9b1b-3b35-5d81-0e616684a744',
        'タイトル5',
        '内容5',
        '2ae3f345-6b17-7171-612d-de2f5a23cd98',
        '2024-11-5 12:00',
        '2024-11-5 12:00'
    );
