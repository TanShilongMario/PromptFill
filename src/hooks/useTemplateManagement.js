import { useCallback } from 'react';
import { TRANSLATIONS } from '../constants/translations';

/**
 * 模板管理 Hook
 * 封装模板的增删改查操作
 *
 * @param {Object} templates - 当前模板列表
 * @param {Function} setTemplates - 设置模板列表的函数
 * @param {string} activeTemplateId - 当前激活的模板ID
 * @param {Object} activeTemplate - 当前激活的模板对象
 * @param {Function} setActiveTemplateId - 设置激活模板ID的函数
 * @param {Function} setIsEditing - 设置编辑状态的函数
 * @param {Function} setEditingTemplateNameId - 设置编辑中模板名称ID的函数
 * @param {Function} setTempTemplateName - 设置临时模板名称的函数
 * @param {Function} setTempTemplateAuthor - 设置临时模板作者的函数
 * @param {string} language - 当前语言
 * @param {boolean} isMobileDevice - 是否为移动设备
 * @param {Function} setMobileTab - 设置移动端Tab的函数
 * @param {Array} INITIAL_TEMPLATES_CONFIG - 初始模板配置
 * @param {Function} t - 翻译函数
 */
export const useTemplateManagement = (
  templates,
  setTemplates,
  activeTemplateId,
  activeTemplate,
  setActiveTemplateId,
  setIsEditing,
  setEditingTemplateNameId,
  setTempTemplateName,
  setTempTemplateAuthor,
  tempTemplateBestModel,
  setTempTemplateBestModel,
  tempTemplateBaseImage,
  setTempTemplateBaseImage,
  tempVideoUrl,
  setTempVideoUrl,
  language,
  isMobileDevice,
  setMobileTab,
  INITIAL_TEMPLATES_CONFIG,
  t
) => {
  // 添加新模板
  // videoSubType: 'structured' | 'freeform' | undefined (仅 type === 'video' 时有效)
  const handleAddTemplate = useCallback((type = 'image', videoSubType) => {
    const newId = `tpl_${Date.now()}`;
    const newName = t('new_template_name');
    const newAuthor = "PromptFill User";

    // 图像模版：带 / 与 { 补全说明的引导文案；视频按子类型
    let content =
      type === 'image' ? t('new_image_template_content') : t('new_template_content');
    if (type === 'video' && videoSubType === 'structured') {
      content = t('new_video_template_structured_content');
    }

    const newTemplate = {
      id: newId,
      name: newName,
      author: newAuthor,
      content: content,
      selections: {},
      tags: [],
      type: type, // 模板类型
      bestModel: type === 'video' ? "Seedance 2.0" : "Nano Banana Pro", // 视频模版默认模型
      baseImage: "optional_base_image"
    };
    
    // 如果是视频模版，初始化 videoUrl 和 source
    if (type === 'video') {
      newTemplate.videoUrl = "";
      newTemplate.source = [];
      // 记录视频子类型，方便后续识别
      if (videoSubType) {
        newTemplate.videoSubType = videoSubType;
      }
    }

    setTemplates(prev => [...prev, newTemplate]);
    setActiveTemplateId(newId);
    setIsEditing(true);

    // 初始化标题和作者编辑状态
    setEditingTemplateNameId(newId);
    setTempTemplateName(newName);
    setTempTemplateAuthor(newAuthor);
    setTempTemplateBestModel(type === 'video' ? "Seedance 2.0" : "Nano Banana Pro");
    setTempTemplateBaseImage("optional_base_image");
    setTempVideoUrl("");

    // 在移动端自动切换到编辑Tab
    if (isMobileDevice) {
      setMobileTab('editor');
    }
  }, [setTemplates, setActiveTemplateId, setIsEditing, setEditingTemplateNameId, setTempTemplateName, setTempTemplateAuthor, isMobileDevice, setMobileTab, t]);

  // 复制模板
  const handleDuplicateTemplate = useCallback((t_item, e) => {
    e.stopPropagation();
    const newId = `tpl_${Date.now()}`;

    const duplicateName = (name) => {
      if (typeof name === 'string') return `${name}${t('copy_suffix')}`;
      const newName = { ...name };
      Object.keys(newName).forEach(lang => {
        const suffix = TRANSLATIONS[lang]?.copy_suffix || ' (Copy)';
        newName[lang] = `${newName[lang]}${suffix}`;
      });
      return newName;
    };

    const isSystemTemplate = INITIAL_TEMPLATES_CONFIG.some(cfg => cfg.id === t_item.id);
    const newTemplate = {
      ...t_item,
      id: newId,
      name: duplicateName(t_item.name),
      author: isSystemTemplate ? "PromptFill User" : (t_item.author || "PromptFill User"),
      selections: { ...t_item.selections },
      bestModel: t_item.bestModel || "Nano Banana Pro",
      baseImage: t_item.baseImage || "optional_base_image"
    };
    setTemplates(prev => [...prev, newTemplate]);
    setActiveTemplateId(newId);
    // 在移动端自动切换到编辑Tab
    if (isMobileDevice) {
      setMobileTab('editor');
    }
  }, [INITIAL_TEMPLATES_CONFIG, setTemplates, setActiveTemplateId, isMobileDevice, setMobileTab, t]);

  // 删除模板
  const handleDeleteTemplate = useCallback((id, e, options = {}) => {
    if (e) e.stopPropagation();
    if (templates.length <= 1) {
      alert(t('alert_keep_one'));
      return;
    }
    const { skipConfirm = false } = options;
    if (skipConfirm || window.confirm(t('confirm_delete_template'))) {
      const newTemplates = templates.filter(t => t.id !== id);
      setTemplates(newTemplates);
      if (activeTemplateId === id) {
        setActiveTemplateId(newTemplates[0].id);
      }
    }
  }, [templates, activeTemplateId, setTemplates, setActiveTemplateId, t]);

  // 重置模板
  const handleResetTemplate = useCallback((id, e, options = {}) => {
    if (e) e.stopPropagation();
    const { skipConfirm = false } = options;
    if (!skipConfirm && !window.confirm(t('confirm_reset_template'))) return;

    const original = INITIAL_TEMPLATES_CONFIG.find(t => t.id === id);
    if (!original) return;

    setTemplates(prev => prev.map(t =>
      t.id === id ? JSON.parse(JSON.stringify(original)) : t
    ));
  }, [INITIAL_TEMPLATES_CONFIG, setTemplates, t]);

  // 开始重命名模板
  const startRenamingTemplate = useCallback((t_item, e) => {
    if (e) e.stopPropagation();
    setIsEditing(true);
    setEditingTemplateNameId(t_item.id);
    setTempTemplateName(typeof t_item.name === 'string' ? t_item.name : t_item.name[language]);
    setTempTemplateAuthor(t_item.author || "");
    setTempTemplateBestModel(t_item.bestModel || "Nano Banana Pro");
    setTempTemplateBaseImage(t_item.baseImage || "optional_base_image");
    setTempVideoUrl(t_item.videoUrl || "");
  }, [setIsEditing, setEditingTemplateNameId, setTempTemplateName, setTempTemplateAuthor, setTempTemplateBestModel, setTempTemplateBaseImage, setTempVideoUrl, language]);

  // 开始编辑
  const handleStartEditing = useCallback(() => {
    setIsEditing(true);
    // 仅初始化临时变量，不设置 editingTemplateNameId (避免某些自动聚焦逻辑)
    if (activeTemplate) {
      setTempTemplateName(typeof activeTemplate.name === 'string' ? activeTemplate.name : activeTemplate.name[language]);
      setTempTemplateAuthor(activeTemplate.author || "");
      setTempTemplateBestModel(activeTemplate.bestModel || "Nano Banana Pro");
      setTempTemplateBaseImage(activeTemplate.baseImage || "optional_base_image");
      setTempVideoUrl(activeTemplate.videoUrl || "");
    }
  }, [setIsEditing, activeTemplate, setTempTemplateName, setTempTemplateAuthor, setTempTemplateBestModel, setTempTemplateBaseImage, setTempVideoUrl, language]);

  // 停止编辑
  const handleStopEditing = useCallback(() => {
    setIsEditing(false);
    setEditingTemplateNameId(null);
  }, [setIsEditing, setEditingTemplateNameId]);

  // 保存模板名称
  const saveTemplateName = useCallback((editingTemplateNameId, tempTemplateName, tempTemplateAuthor, tempTemplateBestModel, tempTemplateBaseImage, tempVideoUrl) => {
    if (editingTemplateNameId && tempTemplateName && tempTemplateName.trim()) {
      setTemplates(prev => prev.map(t_item => {
        if (t_item.id === editingTemplateNameId) {
          const newName = typeof t_item.name === 'object'
            ? { ...t_item.name, [language]: tempTemplateName }
            : tempTemplateName;
          return { 
            ...t_item, 
            name: newName, 
            author: tempTemplateAuthor,
            bestModel: tempTemplateBestModel || t_item.bestModel || "Nano Banana Pro",
            baseImage: tempTemplateBaseImage || t_item.baseImage || "optional_base_image",
            videoUrl: tempVideoUrl !== undefined ? tempVideoUrl : t_item.videoUrl
          };
        }
        return t_item;
      }));
      setEditingTemplateNameId(null);
    }
  }, [language, setTemplates, setEditingTemplateNameId]);

  return {
    handleAddTemplate,
    handleDuplicateTemplate,
    handleDeleteTemplate,
    handleResetTemplate,
    startRenamingTemplate,
    handleStartEditing,
    handleStopEditing,
    saveTemplateName
  };
};
