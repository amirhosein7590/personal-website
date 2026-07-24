'use client'

import React, { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createContext } from 'react';
import { ModalContainer } from '@/components/modules/modal';
import type { CloseModal, Modal, ShowModal, UpdateData } from '@/types/providers/modal';

export type CtxValue = {
    closeModal: CloseModal,
    showModal: ShowModal,
    updateData: UpdateData
}
export const ModalCtx = createContext<CtxValue | null>(null);

function ModalProvider({ children }: PropsWithChildren) {
    const [stack, setStack] = useState<Modal[]>([])
    const id = useRef(1);

    const closeModal: CloseModal = useCallback((id) => {
        setStack(prev => prev.filter(m => m.id != id));
    }, [])

    const updateData: UpdateData = useCallback((id, newData) => {
        setStack(prev => prev.map(m => m.id == id ? { ...m, data: newData } : m))
    }, [])

    const showModalRef = useRef<ShowModal | undefined>(undefined)

    const showModal: ShowModal = useCallback((config) => {
        id.current++
        const newModal: Modal = {
            id: id.current,
            closeModal,
            updateData,
            content: config.content,
            onClose: config.onClose,
            showModal: (innerConfig: Modal) => {
                if (showModalRef.current) {
                    return showModalRef.current(innerConfig)
                }
                return -1
            },
            data: config.data,
            header: config.header,
            parentId: config.parentId,
            size: config.size,
            title: config.title
        }
        setStack(prev => [...prev, newModal]);
        return id.current
    }, [closeModal, updateData]);

    useEffect(() => {
        showModalRef.current = showModal

        return () => {
            setStack([]); // close all modals after unmount
        };
    }, [showModal])

    const value = useMemo(() => ({
        showModal,
        closeModal,
        updateData
    }), [closeModal, updateData, showModal])
    return (
        <ModalCtx.Provider value={value}>
            {children}
            {stack.map(modal => (
                <ModalContainer key={modal.id} close={closeModal} update={updateData} modal={modal} />
            ))}
        </ModalCtx.Provider>
    )
}

ModalProvider.displayName = "ModalProvider" // for debugging

export default ModalProvider