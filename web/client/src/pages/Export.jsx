import React, { useState, useContext } from 'react';
import { Alert, Card, Stack, Typography, CardContent, Box } from '@mui/material';
import AppContext from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import BoxFiltering from '../components/controls/BoxFiltering';
import CurrentDelivery from '../components/export/CurrentDelivery';
import PDFExport from '../components/export/PDFExport';

export default function Export() {
  const {boxes} = useContext(AppContext);
  const [filteredBoxes, setFilteredBoxes] = useState(boxes);
  const { t } = useTranslation();

  const getFolderName = () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    return `TnT Labels - ${currentDate}`;
  };

  if (!boxes)
    return (
      <Box paddingX={'15vw'} paddingY={'10vh'} width={'100%'}>
        <Card style={{ width: '100%', height: '100%', overflow: 'auto', alignItems: 'center' }}>
          <CardContent>
            <Alert severity="info">{t('youHaveNo', {item: t('boxes')})}</Alert>
          </CardContent>
        </Card>
      </Box>
    );

  return (
    <Box paddingX={'15vw'} paddingY={'10vh'} width={'100%'}>
        <Card style={{ width: '100%', height: '100%', overflow: 'auto', alignItems: 'center' }}>
          <CardContent>
            <BoxFiltering boxes={boxes} setFilteredBoxes={setFilteredBoxes} />
              <Stack direction={'column'} spacing={1} alignItems={'center'}>
                <Typography variant='overline'><b>{t('itemsWillBeExported', {count: filteredBoxes.length})}</b></Typography>
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                  <PDFExport objects={filteredBoxes} folderName={getFolderName()} />
                  <CurrentDelivery boxes={filteredBoxes} />
                </Stack>
              </Stack>
          </CardContent>
        </Card>
    </Box>
  );
}
