import { useEffect, useState, useRef } from 'react';
import { projectFirestore } from '../firebase/config';

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    // it helps solve infinite loop
    const query = useRef(_query).current;
    const orderBy = useRef(_orderBy).current;

    useEffect(() => {
        let ref = projectFirestore.collection(collection);

        if (query) {
            ref = ref.where(...query);
        }
        if (orderBy) {
            ref = ref.orderBy(...orderBy);
        }

        // this function runs current snapshot whenever collection updates
        const unsubscribe = ref.onSnapshot(
            (snapshot) => {
                let results = [];
                //array of documents from that snapshot
                snapshot.docs.forEach((doc) => {
                    results.push({ ...doc.data(), id: doc.id });
                });

                // update state
                setDocuments(results);
                setError(null);
            },
            (error) => {
                console.log(error);
                setError('could not fetch the data');
            }
        );

        // unsubscribe on unmount
        return () => unsubscribe();
    }, [collection, query, orderBy]);

    return { documents, error };
};