'use client';
import { useEffect, useState, memo, useCallback } from 'react';
import {
    initMercadoPago,
    CardNumber,
    ExpirationDate,
    SecurityCode,
    createCardToken,
    getPaymentMethods,
    getIssuers,
} from '@mercadopago/sdk-react';
import * as Styles from '@/styles/payment-style';
import { createPaymentMercadoPago } from '@/app/actions';

const CardFields = memo(({ onBinChange }: { onBinChange: (bin: any) => void }) => {
    const handleBinChange = useCallback((bin: any) => {
        if (bin?.bin && typeof bin.bin === 'string') {
            onBinChange(bin);
        }
    }, [onBinChange]);

    return (
        <>
            <Styles.Label>numero de la tarjeta</Styles.Label>
            <div className="card-field">
                <Styles.IconCard top={52} />
                <div className="input-wrapper">
                    <CardNumber
                        style={{ fontSize: '18px' }}
                        onReady={() => console.log('Campo de tarjeta listo')}
                        onBinChange={handleBinChange}
                    />
                </div>
            </div>

            <Styles.InputsContent>
                <div style={{ width: '100%' }}>
                    <Styles.Label>Fecha de vencimiento</Styles.Label>
                    <div className="card-field">
                        <Styles.IconDate/>
                        <div className="input-wrapper">
                            <ExpirationDate style={{ fontSize: '18px' }} />
                        </div>
                    </div>
                </div>

                <div style={{ width: '100%' }}>
                    <Styles.Label>cvv</Styles.Label>
                    <div className="card-field">
                        <Styles.IconCvv top={52} />
                        <div className="input-wrapper">
                            <SecurityCode style={{ fontSize: '18px' }} />
                        </div>
                    </div>
                </div>
            </Styles.InputsContent>

            <style jsx>{`
                .card-field {
                    background: none;
                    border: none;
                    border-bottom: 2px solid #9c9c9cff;
                    width: 100%;
                    height: 40px;
                    padding: 7px 35px;
                    font-size: 18px;
                    transition: border-color 0.5s;
                    position: relative;
                    overflow: hidden;
                }
                
                .input-wrapper {
                    position: absolute;
                    top: 58%;
                    left: 35px;
                    transform: translateY(-50%);
                    width: 100%;
                }
            `}</style>
        </>
    );
});

CardFields.displayName = 'CardFields';

export default function PaymentForm() {
    const [binId, setBinId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        docType: 'RUT',
        docNumber: ''
    });
    const [loading, setLoading] = useState(true);
    const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);
    const [issuersId, setIssuersId] = useState<string | null>(null);

    useEffect(() => {
        initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY || '' , { locale: 'es-CL' });
        setLoading(false);
    }, []);

    const handleBinChange = useCallback((bin: any) => {
        if (bin?.bin) {
            setBinId(bin.bin);
            console.log('BIN actualizado:', bin.bin);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const cardToken = await createCardToken({
                cardholderName: formData.name,
                identificationType: formData.docType,
                identificationNumber: formData.docNumber,
            });

            if (binId) {
                try {
                    const response = await getPaymentMethods({ bin: binId });
                    const id = response?.results[0]?.id;
                    if (id) {
                        setPaymentMethodId(id);
                    }
                    const issuers = await getIssuers({ paymentMethodId: id, bin: binId });
                    console.log('Issuers:', issuers);
                    
                    if (issuers && issuers.length > 0) {
                        console.log('Issuer ID:', issuers[0].id);
                        setIssuersId(issuers[0].id);
                    }
                } catch (issuerError) {
                    console.error('Error al obtener issuers:', issuerError);
                }
            }

            if (cardToken) {
                console.log('TOKEN generado:', cardToken);
            }
        } catch (err) {
            console.error('❌ Error al generar token:', err);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <form onSubmit={handleSubmit} style={{ width: '500px' }}>
            <Styles.Label>titular de la tarjeta</Styles.Label>
            <Styles.InputContents>
                <Styles.Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <Styles.IconUser />
            </Styles.InputContents>

            <Styles.Label>R.U.T</Styles.Label>
            <Styles.InputContents>
                <Styles.Input
                    type="text"
                    name="docNumber"
                    value={formData.docNumber}
                    onChange={handleChange}
                    required
                />
                <Styles.IconRut />
            </Styles.InputContents>

            <CardFields onBinChange={handleBinChange} />

            <button type="submit">Generar Token</button>
        </form>
    );
}