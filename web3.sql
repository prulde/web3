create table survey(
	survey_id int not null generated always as identity,
	survey_name text not null,
	survey_text text not null,
	survey_link text not null,
	survey_flag int not null,
	check (length(survey_name)<30),
	check (length(survey_text)<50),
	check (survey_flag in ('0','1')),
	primary key(survey_id)
)

create table answer(
	answer_id int not null generated always as identity,
	survey_id int not null,
	answer_text text not null,
	check (length(answer_text)<50),
	foreign key(survey_id) references survey(survey_id)
		on delete cascade
		on update cascade,
	primary key(answer_id)
)

create table selected_answer(
	selected_answer_id int not null generated always as identity,
	answer_id int unique not null,
	ip_address text not null,
	answer_date date not null,
	foreign key(answer_id) references answer(answer_id)
		on delete cascade
		on update cascade,
	primary key(selected_answer_id)
)

drop table survey
drop table answer
drop table selected_answer

INSERT INTO survey( survey_name ,survey_text, survey_link, survey_flag )
VALUES ('Administator','Semen123123123','https://Semenovich','0');

INSERT INTO answer( survey_id , answer_text )
VALUES ('1','Semen123123123'),
('1','second answer');

INSERT INTO selected_answer( answer_id , ip_address, answer_date )
VALUES ('2', 'ip123', '20.09.2021');
INSERT INTO selected_answer( answer_id , ip_address, answer_date )
VALUES ('2', 'ip123s', '20.09.2021');

select * FROM survey
ORDER BY survey_id ASC 

select * FROM answer
ORDER BY answer_id ASC 

select * FROM selected_answer
ORDER BY selected_answer_id ASC 