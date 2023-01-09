import React, { useCallback, useRef, useState,useEffect } from 'react'
import ReactTags from 'react-tag-autocomplete'
import './style.scss'

export default function TagSelector(props) {
    const [tags, setTags] = useState(props.newThreadTags || []);

    const [suggestions, setSuggestions] = useState(props.tags);

    const reactTags = useRef();

    const onDelete = useCallback((tagIndex) => {
        setTags(tags.filter((_, i) => i !== tagIndex));
    }, [tags]);

    // TODO: disable selector when tags.length<5
    const onAddition = useCallback((newTag) => {
        setTags([...tags, newTag]);
    }, [tags]);

    // TODO: warning msg
    function onValidate(tag) {
        return tag.name.length >= 3;
    }

    useEffect(() => {
        props.updateThreadTags(tags);
    },[tags])

    return (
        <ReactTags
            ref={reactTags}
            tags={tags}
            suggestions={suggestions}
            onDelete={onDelete}
            onAddition={onAddition}
            placeholderText={tags.length>0?"":"Tag your topic (At most 5 tags)"}
            allowNew={true}
            newTagText={"Create new tag"}
            onValidate={onValidate}
        />
    )
}