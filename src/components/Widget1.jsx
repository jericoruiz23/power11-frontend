import React from 'react'
import { CCol, CRow, CWidgetStatsB } from '@coreui/react'
import './../index.css'

export const WidgetStatsBExample = () => {
    return (
        <div style={{ padding: '1rem', borderColor: 'rgba(0, 47, 255, 0.87)' }}>
            <CRow>
                <CCol xs={12} md={6}>
                    <CWidgetStatsB
                        className="mb-4 custom-progress-blue"
                        progress={{ color: 'primary', value: 75 }}
                        text="Asistencia general"
                        title="Total Invitados"
                        value="89.9%"
                    />
                </CCol>
                <CCol xs={12} md={6}>
                    <CWidgetStatsB
                        className="mb-4 custom-inverse-blue"
                        inverse
                        progress={{ value: 60 }}
                        text="Usuarios que ingresaron"
                        title="Porcentaje asistentes"
                        value="73.2%"
                    />
                </CCol>

            </CRow>
        </div>
    )
}

export default WidgetStatsBExample
