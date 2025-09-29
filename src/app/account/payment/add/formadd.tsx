"use client";
import { useEffect, useState, memo, useCallback, useContext, useRef } from 'react';
import {
    initMercadoPago,
    CardNumber,
    ExpirationDate,
    SecurityCode,
    createCardToken,
    getPaymentMethods,
    getIssuers,
} from '@mercadopago/sdk-react';
import * as Styles from "@/styles/payment-style"
import { ContainerAdd, Label, ButtonAddCard, ButtonAddCardLoading } from "@/styles/pages/payment-manage"
import { saveCardToken } from '@/app/actions';
import { AlertContext } from "@/context/alert-context";

export default function FormAdd() {
    const { showAlert } = useContext(AlertContext);
    const [binId, setBinId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        docType: 'RUT',
        docNumber: '',
        docNumberPublic: '',
    });
    const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);
    const [issuersId, setIssuersId] = useState<string | null>(null);
    const [loadingTransaction, setLoadingTransaction] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY || '', { locale: 'es-CL' });
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    const handleBinChange = useCallback((bin: any) => {
        if (bin?.bin) setBinId(bin.bin);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "name") {
            const lettersOnly = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
            setFormData(prev => ({ ...prev, [name]: lettersOnly }));
        } else if (name === "docNumber") {
            let cleanValue = value.toUpperCase().replace(/[^0-9K]/g, '');

            if (cleanValue.length > 9) cleanValue = cleanValue.slice(0, 9);

            if (cleanValue.length > 1) {
                let body = cleanValue.slice(0, -1).replace(/[^0-9]/g, '');
                let dv = cleanValue.slice(-1);
                if (dv !== 'K' && /\D/.test(dv)) dv = '';
                cleanValue = body + dv;
            }

            setFormData(prev => ({
                ...prev,
                docNumber: cleanValue,
                docNumberPublic: formatRUT(cleanValue),
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    function formatRUT(rut: string) {
        if (!rut) return '';
        let body = rut.slice(0, -1);
        let dv = rut.slice(-1);
        body = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return body + (dv ? '-' + dv : '');
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingTransaction(true);
        setError(false);

        try {
            const cardToken = await createCardToken({
                cardholderName: formData.name,
                identificationType: formData.docType,
                identificationNumber: formData.docNumber,
            });

            if (binId) {
                const response = await getPaymentMethods({ bin: binId });
                const id = response?.results[0]?.id;
                if (id) setPaymentMethodId(id);

                const issuers = await getIssuers({ paymentMethodId: id, bin: binId });
                if (issuers?.length) setIssuersId(issuers[0].id);
            }

            if (cardToken) {
                const res = await saveCardToken(cardToken.id, formData.docType, formData.docNumber);

                if (res.status === 400) {
                    showAlert(res.body.error || 'Error al guardar la tarjeta.');
                    setError(true);
                }
            }

        } catch (err) {
            showAlert('Error al procesar la tarjeta. Verifica los datos e intenta nuevamente.');
            setError(true);
        } finally {
            setLoadingTransaction(false);
        }
    };

    return (
        <ContainerAdd>
            {loading ? (
                <>
                    <Styles.LabelLoading />
                    <Styles.InputContents>
                        <Styles.InputLoading width={470} />
                    </Styles.InputContents>

                    <Styles.LabelLoading />
                    <Styles.InputContents>
                        <Styles.InputLoading width={470} />
                    </Styles.InputContents>

                    <Styles.LabelLoading />
                    <Styles.InputContents>
                        <Styles.InputLoading width={470} />
                    </Styles.InputContents>

                    <Styles.InputsContent>
                        <div style={{ width: '100%' }}>
                            <Styles.LabelLoading />
                            <Styles.InputContents>
                                <Styles.InputLoading />
                            </Styles.InputContents>
                        </div>

                        <div style={{ width: '100%' }}>
                            <Styles.LabelLoading />
                            <Styles.InputContents>
                                <Styles.InputLoading />
                            </Styles.InputContents>
                        </div>
                    </Styles.InputsContent>

                    <ButtonAddCardLoading />
                </>
            ) : (
                <>
                    <Label>TITULAR DE LA TARJETA</Label>
                    <Styles.InputContents>
                        <Styles.IconUser />
                        <Styles.Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            error={error}
                        />
                    </Styles.InputContents>

                    <Label>R.U.T</Label>
                    <Styles.InputContents>
                        <Styles.IconRut />
                        <Styles.Input
                            type="text"
                            name="docNumber"
                            value={formData.docNumberPublic}
                            onChange={handleChange}
                            required
                            error={error}
                        />
                    </Styles.InputContents>

                    <CardFields onBinChange={handleBinChange} error={error} />

                    <ButtonAddCard onClick={handleSubmit} disabled={loadingTransaction}>
                        {loadingTransaction ? 'Procesando...' : 'Agregar'}
                    </ButtonAddCard>
                </>
            )}
        </ContainerAdd>
    )
}

const CardFields = memo(({ onBinChange, error }: { onBinChange: (bin: any) => void; error: boolean; }) => {
    const handleBinChange = useCallback((bin: any) => {
        if (bin?.bin) onBinChange(bin);
    }, [onBinChange]);

    return (
        <>
            <Styles.Label>Número de la tarjeta</Styles.Label>
            <Styles.InputContents>
                <Styles.InputDiv
                    error={error}
                >
                    <Styles.IconCard />
                    <div className="input-wrapper">
                        <CardNumber
                            style={{ fontSize: '18px' }}
                            onBinChange={handleBinChange}
                        />
                    </div>
                </Styles.InputDiv>
            </Styles.InputContents>

            <Styles.InputsContent>
                <div style={{ width: '100%' }}>
                    <Styles.Label>Fecha de vencimiento</Styles.Label>
                    <Styles.InputContents>
                        <Styles.InputDiv error={error}>
                            <Styles.IconDate />
                            <div className="input-wrapper">
                                <ExpirationDate style={{ fontSize: '18px' }} />
                            </div>
                        </Styles.InputDiv>
                    </Styles.InputContents>
                </div>

                <div style={{ width: '100%' }}>
                    <Styles.Label>CVV</Styles.Label>
                    <Styles.InputContents>
                        <Styles.InputDiv error={error}>
                            <Styles.IconCvv />
                            <div className="input-wrapper">
                                <SecurityCode style={{ fontSize: '18px' }} />
                            </div>
                        </Styles.InputDiv>
                    </Styles.InputContents>
                </div>
            </Styles.InputsContent>

            <style jsx>{`
                .input-wrapper {
                    position: absolute;
                    top: 58%;
                    left: 53px;
                    transform: translateY(-50%);
                    width: 100%;
                }
            `}</style>
        </>
    );
});

CardFields.displayName = 'CardFields';
