import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';
import { useFaculty } from '@/hooks/useFaculty';
import FacultyTopbar from '@/components/faculty/FacultyTopbar';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import FileUpload from '@/components/common/FileUpload';
import Button from '@/components/common/Button';
import Avatar from '@/components/common/Avatar';
import Section from '@/components/common/Section';
import Skeleton from '@/components/common/Skeleton';

/**
 * Faculty profile edit form — dispatches facultySlice's updateProfile
 * and uploadProfilePhoto thunks via useFaculty, with a local preview
 * of a selected photo before it's uploaded.
 */
const EditProfile = () => {
  const navigate = useNavigate();
  const { profile, loading, fetchProfile, editProfile, uploadPhoto } = useFaculty();
  const [photoPreview, setPhotoPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', email: '', phone: '', office: '', qualification: '', specialization: '' } });

  useEffect(() => {
    if (!profile) fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        office: profile.office,
        qualification: profile.qualification,
        specialization: profile.specialization,
      });
    }
  }, [profile, reset]);

  const handlePhotoChange = (files) => {
    const file = files?.[0];
    if (!file) return;
    setPhotoPreview(URL.createObjectURL(file));
    uploadPhoto(file).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') toast.success('Profile photo updated.');
    });
  };

  const onSubmit = async (values) => {
    const result = await editProfile(values);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Profile updated successfully.');
      navigate('/faculty/profile');
    }
  };

  if (loading && !profile) {
    return <Skeleton className="h-96 rounded-2xl" />;
  }

  return (
    <div className="flex flex-col gap-6">
      <FacultyTopbar title="Edit Profile" subtitle="Update your personal information" />

      <Link
        to="/faculty/profile"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
      >
        <FiArrowLeft size={14} />
        Back to profile
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
        <Section title="Profile Photo" spacing="sm">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Avatar src={photoPreview || profile?.avatarSrc} name={profile?.name} size="xl" />
            <FileUpload
              accept="image/*"
              helperText="PNG or JPG, up to 5MB"
              className="max-w-sm"
              onChange={handlePhotoChange}
            />
          </div>
        </Section>

        <Section title="Personal Details" spacing="sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Full name"
              required
              error={errors.name}
              {...register('name', { required: 'Name is required' })}
            />
            <Input
              label="Email address"
              type="email"
              required
              error={errors.email}
              {...register('email', { required: 'Email is required' })}
            />
            <Input label="Phone number" {...register('phone')} />
            <Input label="Office location" {...register('office')} />
          </div>
        </Section>

        <Section title="Academic Details" spacing="sm">
          <div className="grid grid-cols-1 gap-4">
            <Input label="Qualification" {...register('qualification')} />
            <TextArea label="Specialization" rows={2} {...register('specialization')} />
          </div>
        </Section>

        <div className="flex items-center justify-end gap-2">
          <Link to="/faculty/profile">
            <Button type="button" variant="outlined">
              Cancel
            </Button>
          </Link>
          <Button type="submit" loading={loading}>
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
