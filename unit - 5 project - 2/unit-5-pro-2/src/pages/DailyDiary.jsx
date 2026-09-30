import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DiarySection from '../components/DiarySection';
import TaskModal from '../components/TaskModal';

function DailyDiary() {
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState(dateParam || '2026-09-29');
  const [modalCategory, setModalCategory] = useState('Daily Task');
  const [editingTask, setEditingTask] = useState(null);

  const handleOpenAdd = (date, category) => {
    setEditingTask(null);
    setModalDate(date);
    setModalCategory(category === 'College' ? 'College' : 'Daily Task');
    setIsModalOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="page-container daily-diary-page">
      <DiarySection
        initialDate={dateParam || '2026-09-29'}
        onOpenAddTask={handleOpenAdd}
        onEditTask={handleEdit}
      />

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        defaultDate={modalDate}
        editingTask={editingTask}
      />
    </div>
  );
}

export default DailyDiary;
