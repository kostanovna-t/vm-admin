import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircleChart from '../components/circle-chart/CircleChart';
import Header from '../components/header/Header';
import LinearChart from '../components/linear-chart/LinearChart';
import Modal from '../components/modal/Modal';
import VMTable from '../components/vm-table/VMTable';
import Wizard from '../components/wizard/Wizard';
import type { AppDispatch } from '../store';
import { fetchAllVMs, selectAllVMs, selectIsLoading } from '../store/slices/vmSlice';
import './pages.scss';

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const vms = useSelector(selectAllVMs);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchAllVMs());
  }, [dispatch]);

  const runningVMs = vms.filter(vm => vm.state === 'running').length;
  const stoppedVMs = vms.filter(vm => vm.state === 'stopped').length;

  const chartData = [
    { state: 'Running', value: runningVMs, color: '#4CAF50' },
    { state: 'Stopped', value: stoppedVMs, color: '#F44336' }
  ];

  // Mock data for LinearChart - 14 days of data
  const linearChartData14Days = [
    { date: '01/05', value: 250 },
    { date: '02/05', value: 320 },
    { date: '03/05', value: 280 },
    { date: '04/05', value: 410 },
    { date: '05/05', value: 380 },
    { date: '06/05', value: 450 },
    { date: '07/05', value: 420 },
    { date: '08/05', value: 380 },
    { date: '09/05', value: 520 },
    { date: '10/05', value: 480 },
    { date: '11/05', value: 550 },
    { date: '12/05', value: 620 },
    { date: '13/05', value: 580 },
    { date: '14/05', value: 650 }
  ];

  // Mock data for LinearChart - 7 days of data (last 7 days from 14 days data)
  const linearChartData7Days = linearChartData14Days.slice(-7);

  const handleClose = useCallback(() => {
    setOpen(false);
    setIsDirty(false);
    setCurrentStep(0);
  }, []);

  const onStepChange = useCallback((stepIndex: number) => {
    setCurrentStep(stepIndex);
  }, []);

  const handleWizardChange = useCallback((_values: unknown, isDirty: boolean) => {
    setIsDirty(isDirty);
  }, []);

  return (
    <div className="page-container">
      <Header />
      <div className="page-content">
        <div className="charts-container">
          <div className="chart-section">
            <CircleChart innerData={chartData} />
          </div>
          <div className="chart-section">
            <LinearChart 
              data={linearChartData14Days} 
              data7Days={linearChartData7Days}
              data14Days={linearChartData14Days}
            />
          </div>
        </div>
        <div className="vm-table-wrapper">
          <div className="vm-table-header">
            <span>Virtual machines {vms.length}</span>
            <button className="new-vm-button" onClick={() => {
              setOpen(true);
            }}>+ New</button>
          </div>
          <div>
            {isLoading ? <div>Loading...</div> : <VMTable items={vms} />}
          </div>
        </div>

        <Modal
          title="New Virtual Machine Wizard"
          isOpen={open}
          onRequestClose={handleClose}
          showConfirmOnClose={currentStep > 0 || isDirty}
          confirmMessage="You have unsaved changes. Are you sure you want to leave?"
        >
          <Wizard 
            onClose={handleClose} 
            onChange={handleWizardChange}
            onStepChange={onStepChange}
          />
        </Modal>
      </div>
    </div>
  );
};

export default DashboardPage;