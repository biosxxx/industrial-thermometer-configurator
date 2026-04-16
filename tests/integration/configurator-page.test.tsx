import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { defaultThermometerConfiguratorState } from '@/entities/thermometer-config/model/defaults';
import { useThermometerConfiguratorStore } from '@/entities/thermometer-config/model/store';
import { ConfiguratorPage } from '@/pages/configurator/ui/ConfiguratorPage';

describe('ConfiguratorPage', () => {
  beforeEach(() => {
    useThermometerConfiguratorStore.setState((state) => ({
      ...state,
      config: defaultThermometerConfiguratorState,
    }));
  });

  it('toggles to custom range mode', async () => {
    const user = userEvent.setup();
    render(<ConfiguratorPage />);

    await user.click(screen.getAllByRole('button', { name: /set custom/i })[0]);

    expect(screen.getAllByPlaceholderText(/min|max/i)).toHaveLength(2);
  });

  it('updates preview badges when connection switches to back', async () => {
    const user = userEvent.setup();
    render(<ConfiguratorPage />);

    await user.click(screen.getByRole('button', { name: /axial \(back\)/i }));

    expect(screen.getAllByText(/back connection/i).length).toBeGreaterThan(0);
  });

  it('shows thermowell fields only when the accessory is enabled', async () => {
    const user = userEvent.setup();
    render(<ConfiguratorPage />);

    expect(screen.queryByText(/thermowell design/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole('switch', { name: /thermowell/i }));

    expect(screen.getByText(/thermowell design/i)).toBeInTheDocument();
    expect(screen.getByText(/thermowell material/i)).toBeInTheDocument();
  });

  it('toggles option buttons and renders preview badge from tag field', async () => {
    const user = userEvent.setup();
    render(<ConfiguratorPage />);

    await user.type(screen.getByLabelText(/tag number/i), 'TI-1001');
    await user.click(screen.getByRole('button', { name: /drag pointer/i }));

    expect(screen.getByRole('button', { name: /drag pointer/i })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText(/tag ti-1001/i)).toBeInTheDocument();
  });

  it('opens the advanced technical editor and adds a table block', async () => {
    const user = userEvent.setup();
    render(<ConfiguratorPage />);

    await user.click(screen.getAllByRole('button', { name: /open advanced technical editor/i })[0]);

    expect(
      screen.getByRole('dialog', { name: /advanced technical specifications/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /add table/i }));

    expect(screen.getAllByText(/specification table/i).length).toBeGreaterThan(0);
  });
});
