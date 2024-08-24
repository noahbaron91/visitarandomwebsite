drop table if exists page;

create table page (
    id serial primary key,
    url text not null,
    is_home boolean not null default false,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);