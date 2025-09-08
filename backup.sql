--
-- PostgreSQL database dump
--

\restrict WvjM84sYRuxSfanJFoIVrk7ESYojWm7QTYbXC9oReHV1xp5LdbgfssnrgLQdtGY

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: playlists; Type: TABLE; Schema: public; Owner: palan
--

CREATE TABLE public.playlists (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.playlists OWNER TO palan;

--
-- Name: playlists_id_seq; Type: SEQUENCE; Schema: public; Owner: palan
--

CREATE SEQUENCE public.playlists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.playlists_id_seq OWNER TO palan;

--
-- Name: playlists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: palan
--

ALTER SEQUENCE public.playlists_id_seq OWNED BY public.playlists.id;


--
-- Name: playlists_tracks; Type: TABLE; Schema: public; Owner: palan
--

CREATE TABLE public.playlists_tracks (
    id integer NOT NULL,
    playlist_id integer NOT NULL,
    track_id integer NOT NULL
);


ALTER TABLE public.playlists_tracks OWNER TO palan;

--
-- Name: playlists_tracks_id_seq; Type: SEQUENCE; Schema: public; Owner: palan
--

CREATE SEQUENCE public.playlists_tracks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.playlists_tracks_id_seq OWNER TO palan;

--
-- Name: playlists_tracks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: palan
--

ALTER SEQUENCE public.playlists_tracks_id_seq OWNED BY public.playlists_tracks.id;


--
-- Name: tracks; Type: TABLE; Schema: public; Owner: palan
--

CREATE TABLE public.tracks (
    id integer NOT NULL,
    name text NOT NULL,
    duration_ms integer NOT NULL
);


ALTER TABLE public.tracks OWNER TO palan;

--
-- Name: tracks_id_seq; Type: SEQUENCE; Schema: public; Owner: palan
--

CREATE SEQUENCE public.tracks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tracks_id_seq OWNER TO palan;

--
-- Name: tracks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: palan
--

ALTER SEQUENCE public.tracks_id_seq OWNED BY public.tracks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: palan
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO palan;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: palan
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO palan;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: palan
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: playlists id; Type: DEFAULT; Schema: public; Owner: palan
--

ALTER TABLE ONLY public.playlists ALTER COLUMN id SET DEFAULT nextval('public.playlists_id_seq'::regclass);


--
-- Name: playlists_tracks id; Type: DEFAULT; Schema: public; Owner: palan
--

ALTER TABLE ONLY public.playlists_tracks ALTER COLUMN id SET DEFAULT nextval('public.playlists_tracks_id_seq'::regclass);


--
-- Name: tracks id; Type: DEFAULT; Schema: public; Owner: palan
--

ALTER TABLE ONLY public.tracks ALTER COLUMN id SET DEFAULT nextval('public.tracks_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: palan
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: playlists; Type: TABLE DATA; Schema: public; Owner: palan
--

COPY public.playlists (id, name, description, user_id) FROM stdin;
\.


--
-- Data for Name: playlists_tracks; Type: TABLE DATA; Schema: public; Owner: palan
--

COPY public.playlists_tracks (id, playlist_id, track_id) FROM stdin;
\.


--
-- Data for Name: tracks; Type: TABLE DATA; Schema: public; Owner: palan
--

COPY public.tracks (id, name, duration_ms) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: palan
--

COPY public.users (id, username, password) FROM stdin;
\.


--
-- Name: playlists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: palan
--

SELECT pg_catalog.setval('public.playlists_id_seq', 1, false);


--
-- Name: playlists_tracks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: palan
--

SELECT pg_catalog.setval('public.playlists_tracks_id_seq', 1, false);


--
-- Name: tracks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: palan
--

SELECT pg_catalog.setval('public.tracks_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: palan
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: playlists playlists_pkey; Type: CONSTRAINT; Schema: public; Owner: palan
--

ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT playlists_pkey PRIMARY KEY (id);


--
-- Name: playlists_tracks playlists_tracks_pkey; Type: CONSTRAINT; Schema: public; Owner: palan
--

ALTER TABLE ONLY public.playlists_tracks
    ADD CONSTRAINT playlists_tracks_pkey PRIMARY KEY (id);


--
-- Name: playlists_tracks playlists_tracks_playlist_id_track_id_key; Type: CONSTRAINT; Schema: public; Owner: palan
--

ALTER TABLE ONLY public.playlists_tracks
    ADD CONSTRAINT playlists_tracks_playlist_id_track_id_key UNIQUE (playlist_id, track_id);


--
-- Name: tracks tracks_pkey; Type: CONSTRAINT; Schema: public; Owner: palan
--

ALTER TABLE ONLY public.tracks
    ADD CONSTRAINT tracks_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: palan
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: palan
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: playlists_tracks playlists_tracks_playlist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: palan
--

ALTER TABLE ONLY public.playlists_tracks
    ADD CONSTRAINT playlists_tracks_playlist_id_fkey FOREIGN KEY (playlist_id) REFERENCES public.playlists(id) ON DELETE CASCADE;


--
-- Name: playlists_tracks playlists_tracks_track_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: palan
--

ALTER TABLE ONLY public.playlists_tracks
    ADD CONSTRAINT playlists_tracks_track_id_fkey FOREIGN KEY (track_id) REFERENCES public.tracks(id) ON DELETE CASCADE;


--
-- Name: playlists playlists_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: palan
--

ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT playlists_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict WvjM84sYRuxSfanJFoIVrk7ESYojWm7QTYbXC9oReHV1xp5LdbgfssnrgLQdtGY

