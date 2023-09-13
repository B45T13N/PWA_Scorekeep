import React from 'react';
import {useParams} from 'react-router-dom';
import './UpdateMatch.scss';

export default function UpdateMatch() {
    const { id } = useParams();


    return (
        <article className="dashboard-matchs">

        </article>
    );
}
